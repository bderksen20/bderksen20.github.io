import './styles/style.css';
import { GfxEngine } from './gfx.ts';

let gfxEngine: GfxEngine | null = null;

// == general =================================================================================
animateNav();

function animateNav()
{
  const navTitle = document.getElementById('nav_title');
  navTitle?.addEventListener('transitionend', (e) => {
    if( e.propertyName === 'transform') {
      navTitle.classList.add('lock');
    }
  });

  document.fonts.ready.then(() => {
    document.getElementById('nav_title')?.classList.add('visible');  // fade in nav title
  });

  requestAnimationFrame(() => {
    navTitle?.classList.add('animate'); // slide title left
    
    // TODO: convert remaining anims to css driven [ transitions + transition-delay ]
  
  });

  // nav link fadein
  setTimeout(() => {
    document.getElementById('nav_about')?.classList.add('visible');
    //document.getElementById('nav_title')?.classList.add('slideanim_complete');
  }, 4000);

  setTimeout(() => {
    document.getElementById('nav_projects')?.classList.add('visible');
  }, 4500);

  setTimeout(() => {
    document.getElementById('nav_contact')?.classList.add('visible');
  }, 5000);

  
}

// == three stuff ==============================================================================
const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
if( !canvas )
  throw new Error('Could not find canvas for three.js rendering...');

window.addEventListener( 'resize', onWindowResize, false );

gfxEngine = new GfxEngine(canvas);
gfxEngine.run();

function onWindowResize(){
  gfxEngine?.resize();
};
