export function ViewWork(): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = `
    <h1>Call of Duty: Black Ops 7<h1>
    <h3>Engine & Graphics Programmer - 1 yr<h3>

    <h1>Call of Duty: Black Ops 6<h1>
    <h3>Engine & Graphics Programmer - 2 yrs<h3>

    <h1>Call of Duty: Modern Warfare III<h1>
    <h3>Engine & Graphics Programmer - 1 yr<h3>
    <p>
        Overhauled beam vfx systems to provide greater fidelity and interactivity, prioritizing artist/gameplay vision, freedom of expression, and system performance.
        Included a suite of new beam vfx features implemented fullstack, in engine, gfx, script, and artist tools.
        <br><br>
        Look no further than the MW3 disciple zombie to see one example of this work realized as a gooey siphon of viscera.
    <p>
    <!--
    <img src="/images/mw3-disciple.webp" alt="MW3 Disciple Zombie Beam VFX" width="500px">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/XzFMPWwRUSE?si=OANH9r4MfWeTTkrt&amp;start=96" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    -->
    `;
  return el;
}