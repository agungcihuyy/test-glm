import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { RoundedBox } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext.jsx";

extend({ MeshLineGeometry, MeshLineMaterial });

/* ============================================================
   Util: rounded rect (fallback bila ctx.roundRect tidak ada)
   ============================================================ */
function rr(ctx, x, y, w, h, r) {
  ctx.save();
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  ctx.restore();
}

/* ============================================================
   Wajah kartu digambar ke canvas → menjadi tekstur 3D
   ============================================================ */
function drawCardFace(canvas, theme, photo) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  const dark = theme === "dark";
  const cardBg = dark ? "#efe8d8" : "#1b1813";
  const ink = dark ? "#17140f" : "#ede6d8";
  const muted = dark ? "#8f8776" : "#948c7c";
  const line = dark ? "#c9c0a6" : "#3b362c";

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = cardBg;
  ctx.fillRect(0, 0, w, h);

  // bingkai tipis
  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  rr(ctx, 12, 12, w - 24, h - 24, 14);
  ctx.stroke();

  // area foto
  const px = 34;
  const py = 34;
  const pw = w - 68;
  const ph = 400;

  ctx.save();
  rr(ctx, px, py, pw, ph, 8);
  ctx.clip();
  if (photo) {
    const scale = Math.max(pw / photo.width, ph / photo.height);
    const sw = pw / scale;
    const sh = ph / scale;
    ctx.drawImage(
      photo,
      (photo.width - sw) / 2,
      (photo.height - sh) / 2,
      sw,
      sh,
      px,
      py,
      pw,
      ph
    );
    ctx.fillStyle = "rgba(16,14,11,0.06)";
    ctx.fillRect(px, py, pw, ph);
  } else {
    // siluet placeholder
    ctx.fillStyle = dark ? "#d8cfba" : "#443e32";
    ctx.beginPath();
    ctx.arc(w / 2, py + ph * 0.4, pw * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w / 2, py + ph * 1.02, pw * 0.3, ph * 0.46, 0, Math.PI, 0);
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  rr(ctx, px, py, pw, ph, 8);
  ctx.stroke();

  // slot tampung klip di atas kartu
  ctx.fillStyle = cardBg;
  rr(ctx, w / 2 - 64, py - 13, 128, 26, 13);
  ctx.fill();
  ctx.strokeStyle = line;
  rr(ctx, w / 2 - 64, py - 13, 128, 26, 13);
  ctx.stroke();

  // nama & peran
  ctx.textAlign = "center";
  ctx.fillStyle = ink;
  try {
    ctx.letterSpacing = "2px";
  } catch (e) {
    /* diabaikan */
  }
  ctx.font = "800 50px Syne, sans-serif";
  ctx.fillText("AGUNG PANDU", w / 2, py + ph + 64);

  ctx.fillStyle = muted;
  ctx.font = "22px 'JetBrains Mono', monospace";
  try {
    ctx.letterSpacing = "6px";
  } catch (e) {
    /* diabaikan */
  }
  ctx.fillText("FULLSTACK DEVELOPER", w / 2, py + ph + 102);
  ctx.font = "17px 'JetBrains Mono', monospace";
  ctx.fillText("UI ENGINEER · REACT · NODE.JS", w / 2, py + ph + 132);

  // barcode
  const bx = 34;
  const by = h - 116;
  const bw = w - 178;
  const bh = 52;
  const seg = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 4, 1];
  ctx.fillStyle = ink;
  let x = bx;
  let i = 0;
  while (x < bx + bw) {
    const ww = seg[i % seg.length];
    if (i % 2 === 0) ctx.fillRect(x, by, ww * 1.7, bh);
    x += ww * 2.9 + 1.6;
    i++;
  }
  ctx.fillStyle = muted;
  ctx.font = "18px 'JetBrains Mono', monospace";
  try {
    ctx.letterSpacing = "4px";
  } catch (e) {
    /* diabaikan */
  }
  ctx.textAlign = "right";
  ctx.fillText("NO.001", w - 34, by + bh / 2 + 6);
}

/* ============================================================
   Tekstur wajah kartu (re-draw saat tema berubah / foto siap)
   ============================================================ */
function useCardFaceTexture(theme) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 736;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    drawCardFace(c, theme, null);
    return t;
  }, [theme]);

  useEffect(() => {
    let alive = true;
    const canvas = tex.image;

    const redraw = () => {
      if (alive) tex.needsUpdate = true;
    };

    // tunggu font agar teks kartu tidak pakai fallback
    document.fonts?.ready?.then(redraw);

    // muat foto dengan fallback svg
    const load = (srcs, i) => {
      if (!alive || i >= srcs.length) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!alive) return;
        drawCardFace(canvas, theme, img);
        redraw();
      };
      img.onerror = () => load(srcs, i + 1);
      img.src = srcs[i];
    };
    load(["/images/portrait.jpg", "/images/portrait.svg"], 0);

    return () => {
      alive = false;
    };
  }, [theme, tex]);

  return tex;
}

/* ============================================================
   Tekstur tali lanyard (garis diagonal)
   ============================================================ */
function useStrapTexture(theme) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 128, 128);
    const dark = theme === "dark";
    ctx.strokeStyle = dark ? "rgba(237,230,216,1)" : "rgba(22,20,15,1)";
    ctx.lineWidth = 24;
    ctx.beginPath();
    for (let i = -128; i <= 256; i += 60) {
      ctx.moveTo(i, -10);
      ctx.lineTo(i + 148, 138);
    }
    ctx.stroke();
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [theme]);
}

/* ============================================================
   BADGE — replika metode 3D_CARD
   (rope joint chain + kartu dinamis + tali meshline)
   ============================================================ */
function Badge({ maxSpeed = 50, minSpeed = 10 }) {
  const { theme } = useTheme();
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const faceTex = useCardFaceTexture(theme);
  const strapTex = useStrapTexture(theme);

  const colors =
    theme === "dark"
      ? { card: "#efe8d8", ink: "#17140f", metal: "#b8ae97" }
      : { card: "#1b1813", ink: "#efe8d8", metal: "#7d745e" };

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.1, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
    }
  });

  return (
    <>
      <group position={[0, 3.3, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, 2.55, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 1.8, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 1.05, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -0.15, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.78, 1.1, 0.04]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))
              )
            )}
          >
            {/* badan kartu 3D */}
            <RoundedBox args={[1.55, 2.2, 0.07]} radius={0.09} smoothness={4}>
              <meshPhysicalMaterial
                color={colors.card}
                roughness={0.4}
                metalness={0.05}
                clearcoat={0.6}
                clearcoatRoughness={0.4}
              />
            </RoundedBox>

            {/* wajah depan: foto + nama + barcode (tekstur canvas) */}
            <mesh position={[0, 0, 0.041]}>
              <planeGeometry args={[1.44, 2.08]} />
              <meshStandardMaterial map={faceTex} roughness={0.55} metalness={0} />
            </mesh>

            {/* wajah belakang */}
            <mesh position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.44, 2.08]} />
              <meshStandardMaterial color={colors.ink} roughness={0.6} metalness={0} />
            </mesh>

            {/* klip logam */}
            <RoundedBox args={[0.3, 0.14, 0.07]} radius={0.04} position={[0, 1.16, 0]}>
              <meshStandardMaterial
                color={colors.metal}
                roughness={0.3}
                metalness={0.6}
              />
            </RoundedBox>
          </group>
        </RigidBody>
      </group>

      {/* tali: kurva meshline mengikuti rope joints */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={strapTex}
          repeat={[-5, 1]}
          lineWidth={0.35}
        />
      </mesh>
    </>
  );
}

export default function Badge3D() {
  const { theme } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0.6, 13.5], fov: 26 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Badge key={theme} />
      </Physics>
    </Canvas>
  );
}
