/**
 * PRISMATIC — 3D OPTICAL PRISM SCULPTURE
 * Real-time WebGL implementation with realistic refraction, chromatic aberration & cursor interaction
 */

(function () {
  const canvas = document.getElementById('heroPrismCanvas');
  const container = document.getElementById('hero3DContainer');
  if (!canvas || !container) return;

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    renderCanvasFallback();
    return;
  }

  let scene, camera, renderer, prismGroup, innerCore, outerPrism, pointLight1, pointLight2, pointLight3;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = 0;
  let width = container.clientWidth;
  let height = container.clientHeight;

  initThree();
  animate();

  function initThree() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Prism Group Container
    prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // 1. Outer Crystalline Prism (Icosahedron / Faceted Optical Crystal)
    const geometry = new THREE.IcosahedronGeometry(2.2, 0);
    
    // Glass shader material approximation
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x11120F,
      emissive: 0x161814,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 2.4, // High refractive index (diamond/dense glass)
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
      wireframe: false
    });

    outerPrism = new THREE.Mesh(geometry, prismMaterial);
    prismGroup.add(outerPrism);

    // 2. Wireframe Optical Contour Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.22, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xD6FF35,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    prismGroup.add(wireMesh);

    // 3. Inner Kinetic Iridescent Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x54D9C5,
      emissive: 0xFF5A36,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true
    });
    innerCore = new THREE.Mesh(coreGeo, coreMat);
    prismGroup.add(innerCore);

    // Lighting (Chromatic Dispersion Simulation)
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Acid Lime key light
    pointLight1 = new THREE.PointLight(0xD6FF35, 3.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    // Signal Orange rim light
    pointLight2 = new THREE.PointLight(0xFF5A36, 4.0, 20);
    pointLight2.position.set(-6, -4, 4);
    scene.add(pointLight2);

    // Iridescent Teal fill light
    pointLight3 = new THREE.PointLight(0x54D9C5, 2.5, 20);
    pointLight3.position.set(0, -6, -4);
    scene.add(pointLight3);

    // Event Listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  function onMouseMove(e) {
    // Normalized mouse (-1 to 1)
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function onScroll() {
    scrollY = window.pageYOffset;
  }

  function onResize() {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Smooth Damped Mouse Follow
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Natural Idle Floating & Rotation
    prismGroup.rotation.x = time * 0.2 + mouse.y * 0.8;
    prismGroup.rotation.y = time * 0.25 + mouse.x * 0.8;
    prismGroup.rotation.z = Math.sin(time * 0.5) * 0.15;

    // Inner Core Counter-Rotation
    innerCore.rotation.x = -time * 0.4;
    innerCore.rotation.y = time * 0.5;

    // Subtle Float Levitation
    prismGroup.position.y = Math.sin(time * 1.2) * 0.18 - (scrollY * 0.0015);
    prismGroup.position.x = mouse.x * 0.35;

    // Pulse Light Intensities
    pointLight1.intensity = 3.0 + Math.sin(time * 2.0) * 0.8;
    pointLight2.intensity = 3.5 + Math.cos(time * 1.8) * 0.8;

    renderer.render(scene, camera);
  }

  // Fallback 2D Canvas Renderer if WebGL/Three is blocked
  function renderCanvasFallback() {
    const ctx = canvas.getContext('2d');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    let angle = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Iridescent Radial Gradient
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
      grad.addColorStop(0, 'rgba(214, 255, 53, 0.8)');
      grad.addColorStop(0.5, 'rgba(84, 217, 197, 0.6)');
      grad.addColorStop(1, 'rgba(255, 90, 54, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const r = 160 + Math.sin(angle * 3 + i) * 20;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#D6FF35';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
      angle += 0.01;
      requestAnimationFrame(draw);
    }
    draw();
  }
})();

