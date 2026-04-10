export function ViewWork(): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = `
    <h1>Call of Duty: Black Ops 7<h1>
    <h3>Engine & Graphics Programmer - 1 yr<h3>
    <p>
    </p>

    <h1>Call of Duty: Black Ops 6<h1>
    <h3>Engine & Graphics Programmer - 2 yrs<h3>
    <p>
        Delivered a camo/material system providing rendering and engine functionality to support a new type of in-game cosmetic.
    </p>
    <p>
        Additionally contributed to a wide variety of engine, gfx, and tooling systems. A few high level examples include...
    </p>
    <ul>
        <li>[ postfx ] - implemented engine subsystems with respective gameplay interactivity and artist tooling</li>
        <li>[ tools ] - designed inter-application systems used to expedite artist workflows</li>
        <li>[ beam vfx ] - continued to maintain and support beam vfx systems, added new features</li>
        <li>[ laser + tracer vfx ] - improved weapon lasers and bullet tracer effects</li>
        <li>[ gameplay ] - bespoke shaders for gamemode / gameplay mechanics ( e.g. prop hunt )</li>
    </ul>

    <h1>Call of Duty: Modern Warfare III<h1>
    <h3>Engine & Graphics Programmer - 1 yr<h3>
    <p>
        Overhauled beam vfx systems to provide greater fidelity and interactivity, prioritizing artist/gameplay vision, freedom of expression, and system performance.
        Included a suite of new beam vfx features implemented fullstack, in engine, gfx, script, and artist tools.
    </p>
    <p>
        For example, take a look at the MW3 disciple zombie to see this work realized as a gruesome siphon of viscera.
    </p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/XzFMPWwRUSE?si=OANH9r4MfWeTTkrt&amp;start=96" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <img src="/images/mw3-disciple.webp" alt="MW3 Disciple Zombie Beam VFX" width="560px">
    <!--
    -->
    `;
  return el;
}