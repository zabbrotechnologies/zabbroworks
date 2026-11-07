/**
 * PRISMATIC — 3D OPTICAL PRISM SCULPTURE (Standalone Mirror)
 */
(function () {
  const canvas = document.getElementById('heroPrismCanvas');
  const container = document.getElementById('hero3DContainer');
  if (!canvas || !container) return;

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

    prismGroup = new THREE.Group();
    scene.add(prismGroup);

    const geometry = new THREE.IcosahedronGeometry(2.2, 0);
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x11120F,
      emissive: 0x161814,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 2.4,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88
    });

    outerPrism = new THREE.Mesh(geometry, prismMaterial);
    prismGroup.add(outerPrism);

    const wireGeo = new THREE.IcosahedronGeometry(2.22, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xD6FF35,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    prismGroup.add(new THREE.Mesh(wireGeo, wireMat));

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    pointLight1 = new THREE.PointLight(0xD6FF35, 3.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    pointLight2 = new THREE.PointLight(0xFF5A36, 4.0, 20);
    pointLight2.position.set(-6, -4, 4);
    scene.add(pointLight2);

    pointLight3 = new THREE.PointLight(0x54D9C5, 2.5, 20);
    pointLight3.position.set(0, -6, -4);
    scene.add(pointLight3);

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      scrollY = window.pageYOffset;
    }, { passive: true });

    window.addEventListener('resize', () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    const time = performance.now() * 0.001;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    prismGroup.rotation.x = time * 0.2 + mouse.y * 0.8;
    prismGroup.rotation.y = time * 0.25 + mouse.x * 0.8;
    prismGroup.rotation.z = Math.sin(time * 0.5) * 0.15;

    innerCore.rotation.x = -time * 0.4;
    innerCore.rotation.y = time * 0.5;

    prismGroup.position.y = Math.sin(time * 1.2) * 0.18 - (scrollY * 0.0015);
    prismGroup.position.x = mouse.x * 0.35;

    pointLight1.intensity = 3.0 + Math.sin(time * 2.0) * 0.8;
    pointLight2.intensity = 3.5 + Math.cos(time * 1.8) * 0.8;

    renderer.render(scene, camera);
  }

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

