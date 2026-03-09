// Aframe Javascript logic has been made with assitance from ChatGpt
AFRAME.registerComponent('clickable-environment', {
  init: function () {
    const validLinks = {
      about: 'about.html',
      contact: 'contact.html',
      gallery: 'gallery.html',
      work: 'work.html'
    };

    console.log('Clickable environment initialized');

    const scene = this.el.sceneEl;
    let hoveredObject = null;

    // Opening animation
    const model = this.el;
    model.object3D.scale.set(0, 0, 0);
    const targetScale = new THREE.Vector3(1, 1, 1); 
    const duration = 2000;
    const totalRotation = Math.PI * 2; 

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateOpening(timestamp) {
      if (!animateOpening.start) animateOpening.start = timestamp;
      const elapsed = timestamp - animateOpening.start;
      let progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      // Scale
      model.object3D.scale.set(
        targetScale.x * eased,
        targetScale.y * eased,
        targetScale.z * eased
      );

      // Rotate around Y axis
      model.object3D.rotation.y = totalRotation * eased;

      if (progress < 1) {
        requestAnimationFrame(animateOpening);
      } else {
        // Save original scale for all meshes and groups with validLinks
        model.object3D.traverse((obj) => {
          if (obj.isMesh || validLinks[obj.name?.toLowerCase()]) {
            if (!obj.originalScale) obj.originalScale = obj.scale.clone();
          }
        });
      }
    }
    requestAnimationFrame(animateOpening);

    // Hover Detection
    scene.addEventListener('raycaster-intersection', (evt) => {
      const intersection = evt.detail.intersections[0];
      if (!intersection) return;

      let current = intersection.object;
      let target = null;

      // Walk up hierarchy to find a valid link
      while (current) {
        const name = current.name?.toLowerCase();
        if (validLinks[name]) {
          target = current;
          break;
        }
        current = current.parent;
      }

      // Reset previous hovered object if different
      if (hoveredObject && hoveredObject !== target) {
        hoveredObject.scale.copy(hoveredObject.originalScale);
        hoveredObject = null;
        document.body.style.cursor = 'default';
      }

      if (target && hoveredObject !== target) {
        // Scale new hovered object
        target.scale.set(
          target.originalScale.x * 1.1,
          target.originalScale.y * 1.05,
          target.originalScale.z * 1.1
        );
        hoveredObject = target;
        document.body.style.cursor = 'pointer';
      }
    });

    scene.addEventListener('raycaster-intersection-cleared', () => {
      if (hoveredObject) {
        hoveredObject.scale.copy(hoveredObject.originalScale);
        hoveredObject = null;
      }
      document.body.style.cursor = 'default';
    });

    // Click Detection
    this.el.addEventListener('click', (evt) => {
      const hit = evt.detail?.intersection?.object;
      if (!hit) return;

      let current = hit;
      while (current) {
        const name = current.name?.toLowerCase();
        if (validLinks[name]) {
          console.log('Clicked group:', name);
          window.location.href = validLinks[name];
          return;
        }
        current = current.parent;
      }
    });
  }
});

// Typewriter Overlay
window.onload = () => {
  const overlay = document.getElementById('openingText');
  const text = "Welcome to my world, drag around to explore!";
  let index = 0;
  const speed = 75; // ms per character

  function typeWriter() {
    if (index < text.length) {
      overlay.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();


const helpButton = document.getElementById('help');
const helpOverlay = document.getElementById('help_overlay');

helpButton.addEventListener('click', () => {
    helpOverlay.classList.toggle('active');
});
};