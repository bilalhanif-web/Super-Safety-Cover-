const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'menu');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate an ultra-clean, realistic black motorcycle with fitted waterproof cover
// Filling 85-90% of the visual space with realistic satin fabric and soft studio shadow
const createBikeCoverSvg = () => {
  return `<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background clean radial gradient for subtle studio lighting -->
    <radialGradient id="studioLighting" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#FAFAF9"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>

    <!-- Main Fabric Shading Gradients -->
    <linearGradient id="bodyBaseGrad" x1="15%" y1="5%" x2="85%" y2="95%">
      <stop offset="0%" stop-color="#32353B"/>
      <stop offset="30%" stop-color="#212328"/>
      <stop offset="65%" stop-color="#141517"/>
      <stop offset="100%" stop-color="#0A0B0D"/>
    </linearGradient>

    <!-- Tank & Handlebars Specular Shading -->
    <linearGradient id="topHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4E535C" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#2C2F36" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#141517" stop-opacity="0"/>
    </linearGradient>

    <!-- Seat Valley Shadow -->
    <linearGradient id="valleyShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0B0C0E" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#181A1D" stop-opacity="0.2"/>
    </linearGradient>

    <!-- Underbody Shadow -->
    <linearGradient id="underbodyShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181A1D" stop-opacity="0"/>
      <stop offset="100%" stop-color="#070809" stop-opacity="0.98"/>
    </linearGradient>

    <!-- Front Fork & Wheel Slope Gradient -->
    <linearGradient id="frontSlopeGrad" x1="20%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#3D414A"/>
      <stop offset="40%" stop-color="#24262C"/>
      <stop offset="100%" stop-color="#111215"/>
    </linearGradient>

    <!-- Tail Gradient -->
    <linearGradient id="tailGrad" x1="10%" y1="5%" x2="90%" y2="95%">
      <stop offset="0%" stop-color="#3A3E47"/>
      <stop offset="50%" stop-color="#212328"/>
      <stop offset="100%" stop-color="#111215"/>
    </linearGradient>

    <!-- Ground Contact Shadows -->
    <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0C0D0F" stop-opacity="0.30"/>
      <stop offset="50%" stop-color="#0C0D0F" stop-opacity="0.14"/>
      <stop offset="85%" stop-color="#0C0D0F" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#0C0D0F" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="tireShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
      <stop offset="65%" stop-color="#000000" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <filter id="blurSoft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="blurShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="15"/>
    </filter>
  </defs>

  <!-- Clean Studio Off-White Background -->
  <rect width="1200" height="900" fill="url(#studioLighting)"/>

  <!-- SCALED AND CENTERED MOTORCYCLE ASSEMBLY (Scaled 1.18x to use 88% visual area) -->
  <g transform="translate(600, 475) scale(1.18) translate(-615, -460)">
    
    <!-- STUDIO GROUND SHADOWS -->
    <g transform="translate(615, 725)">
      <!-- Broad ambient motorcycle shadow -->
      <ellipse cx="0" cy="0" rx="460" ry="38" fill="url(#groundShadow)" filter="url(#blurShadow)"/>
      <!-- Dense underbody core shadow -->
      <ellipse cx="-10" cy="-6" rx="380" ry="22" fill="#0A0B0D" opacity="0.25" filter="url(#blurSoft)"/>
      <!-- Front wheel direct contact shadow -->
      <ellipse cx="-285" cy="2" rx="80" ry="12" fill="url(#tireShadow)"/>
      <!-- Rear wheel direct contact shadow -->
      <ellipse cx="275" cy="2" rx="90" ry="14" fill="url(#tireShadow)"/>
      <!-- Center stand shadow -->
      <ellipse cx="10" cy="0" rx="65" ry="8" fill="url(#tireShadow)"/>
    </g>

    <!-- REALISTIC TIRES UNDER HEM -->
    <!-- Front Tire Arch -->
    <path d="M 275 670 Q 315 725 365 725 Q 410 725 435 680" fill="none" stroke="#141517" stroke-width="26" stroke-linecap="round"/>
    <path d="M 282 672 Q 315 720 365 720 Q 405 720 430 682" fill="none" stroke="#222428" stroke-width="6" stroke-linecap="round"/>
    <path d="M 318 692 L 332 715 M 352 698 L 362 722 M 382 694 L 388 716" stroke="#0E0F10" stroke-width="3" stroke-linecap="round"/>

    <!-- Rear Tire Arch -->
    <path d="M 795 675 Q 845 730 895 730 Q 940 730 970 675" fill="none" stroke="#141517" stroke-width="32" stroke-linecap="round"/>
    <path d="M 803 677 Q 845 724 895 724 Q 935 724 963 678" fill="none" stroke="#222428" stroke-width="8" stroke-linecap="round"/>
    <path d="M 838 696 L 848 720 M 872 701 L 880 726 M 908 699 L 916 721" stroke="#0E0F10" stroke-width="3" stroke-linecap="round"/>

    <!-- MOTORCYCLE COVER MAIN BODY -->
    <g id="bikeCoverBody">
      <!-- Base Outer Silhouette -->
      <path d="
        M 235 680
        C 225 630, 220 560, 242 490
        C 258 440, 288 380, 318 320
        C 334 285, 344 230, 368 205
        C 384 190, 408 195, 418 220
        C 428 245, 434 275, 454 285
        C 474 295, 510 270, 560 270
        C 610 270, 646 305, 680 345
        C 710 380, 746 400, 790 395
        C 830 390, 870 370, 915 360
        C 945 355, 970 365, 985 390
        C 1008 425, 1018 480, 1012 540
        C 1008 600, 998 650, 988 680
        C 960 685, 930 670, 890 665
        C 840 660, 790 668, 730 670
        C 670 672, 600 665, 540 660
        C 480 655, 420 668, 360 675
        C 310 680, 268 685, 235 680
        Z
      " fill="url(#bodyBaseGrad)"/>

      <!-- 1. Front Wheel & Fork Drape Section -->
      <path d="
        M 235 680
        C 225 630, 220 560, 242 490
        C 258 440, 288 380, 318 320
        C 338 340, 364 410, 374 490
        C 384 570, 380 640, 360 675
        C 310 680, 268 685, 235 680
        Z
      " fill="url(#frontSlopeGrad)" opacity="0.95"/>

      <!-- Front Fork Sub-contour -->
      <path d="
        M 314 330
        C 328 380, 348 460, 354 550
        C 358 610, 354 650, 344 675
      " fill="none" stroke="#42464F" stroke-width="3" stroke-linecap="round" opacity="0.45"/>

      <!-- 2. Handlebar & Mirror Contour -->
      <path d="
        M 344 280
        C 344 235, 358 200, 374 205
        C 388 210, 398 240, 394 285
        Z
      " fill="#32363D"/>
      <ellipse cx="374" cy="208" rx="14" ry="7" fill="#4C515C" opacity="0.7"/>

      <path d="
        M 368 210
        C 398 220, 428 250, 448 290
        C 428 300, 398 295, 374 280
        Z
      " fill="#24262B"/>

      <!-- 3. Fuel Tank Arched Dome -->
      <path d="
        M 448 285
        C 478 270, 518 268, 568 272
        C 618 276, 658 310, 680 345
        C 638 375, 578 385, 518 380
        C 474 375, 454 330, 448 285
        Z
      " fill="url(#tailGrad)"/>

      <!-- Tank Specular Satin Highlight -->
      <path d="
        M 468 285
        C 504 274, 544 274, 584 282
        C 558 305, 514 310, 474 305
        Z
      " fill="url(#topHighlight)" opacity="0.6"/>

      <!-- 4. Deep Saddle / Seat Scoop -->
      <path d="
        M 528 380
        C 588 385, 648 370, 688 350
        C 728 385, 768 405, 808 400
        C 778 435, 708 445, 638 440
        C 578 435, 538 410, 528 380
        Z
      " fill="url(#valleyShadow)"/>

      <!-- 5. Passenger Pillion & Swept-up Tail Section -->
      <path d="
        M 688 350
        C 738 380, 798 395, 858 375
        C 908 360, 954 365, 984 390
        C 958 435, 914 450, 848 455
        C 778 460, 718 425, 688 350
        Z
      " fill="url(#tailGrad)"/>

      <!-- Tail Specular Highlight -->
      <path d="
        M 848 372
        C 888 363, 928 365, 964 382
        C 944 395, 904 395, 858 390
        Z
      " fill="url(#topHighlight)" opacity="0.5"/>

      <!-- 6. Rear Drop Down To Hem -->
      <path d="
        M 984 390
        C 1006 425, 1016 480, 1010 540
        C 1006 600, 996 650, 986 680
        C 958 685, 928 670, 888 665
        C 884 610, 914 540, 938 480
        C 964 420, 978 400, 984 390
        Z
      " fill="#131416"/>

      <!-- 7. Center Engine & Frame Underbody Mass -->
      <path d="
        M 374 490
        C 428 480, 518 460, 598 450
        C 688 440, 778 455, 848 455
        C 868 520, 874 590, 868 665
        C 788 668, 708 672, 598 665
        C 498 660, 428 665, 360 675
        C 374 610, 378 540, 374 490
        Z
      " fill="url(#underbodyShadow)"/>

      <!-- Exhaust Pipe Contour -->
      <path d="
        M 538 610
        C 618 615, 718 605, 828 570
        C 858 560, 878 555, 894 550
      " fill="none" stroke="#25272C" stroke-width="12" stroke-linecap="round" opacity="0.6"/>

      <!-- ELEGANT DOUBLE-NEEDLE SEAM ACCENTS (Subtle, realistic construction lines) -->
      <!-- Top Spine Seam -->
      <path d="
        M 368 205
        C 408 240, 438 280, 464 285
        C 508 270, 558 270, 608 280
        C 658 310, 708 380, 758 395
        C 818 390, 878 370, 928 362
        C 958 365, 984 390, 998 440
      " fill="none" stroke="#2E3137" stroke-width="2" opacity="0.5"/>

      <!-- Panel Division Seams -->
      <path d="
        M 464 285
        C 454 350, 434 430, 414 520
        C 398 580, 384 630, 374 675
      " fill="none" stroke="#27292F" stroke-width="1.8" opacity="0.5"/>

      <path d="
        M 604 280
        C 618 340, 624 410, 614 480
        C 604 550, 594 610, 588 665
      " fill="none" stroke="#27292F" stroke-width="1.8" opacity="0.45"/>

      <path d="
        M 818 390
        C 824 440, 818 500, 808 560
        C 798 610, 788 645, 784 668
      " fill="none" stroke="#27292F" stroke-width="1.8" opacity="0.45"/>

      <!-- NATURAL FABRIC TENSION WRINKLES -->
      <path d="M 378 230 C 398 270, 414 320, 418 370" fill="none" stroke="#0F1012" stroke-width="2.5" opacity="0.5"/>
      <path d="M 344 310 C 328 360, 308 420, 294 480" fill="none" stroke="#0F1012" stroke-width="2.5" opacity="0.45"/>
      <path d="M 638 405 C 668 420, 708 420, 738 405" fill="none" stroke="#0A0B0C" stroke-width="3" opacity="0.6"/>
      <path d="M 648 425 C 678 435, 708 435, 734 422" fill="none" stroke="#0A0B0C" stroke-width="2" opacity="0.5"/>

      <!-- HEAVY DUTY ELASTICATED LOWER HEM -->
      <path d="
        M 235 680
        C 268 685, 308 680, 360 675
        C 420 668, 480 655, 540 660
        C 600 665, 670 672, 730 670
        C 790 668, 840 660, 890 665
        C 930 670, 960 685, 986 680
      " fill="none" stroke="#090A0B" stroke-width="11" stroke-linecap="round"/>

      <path d="
        M 235 678
        C 268 683, 308 678, 360 673
        C 420 666, 480 653, 540 658
        C 600 663, 670 670, 730 668
        C 790 666, 840 658, 890 663
        C 930 668, 960 683, 986 678
      " fill="none" stroke="#2E3036" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Gather stitches along hem -->
      <g stroke="#0E0F11" stroke-width="2.5">
        <line x1="250" y1="675" x2="250" y2="685"/>
        <line x1="265" y1="676" x2="265" y2="686"/>
        <line x1="280" y1="677" x2="280" y2="687"/>
        <line x1="295" y1="676" x2="295" y2="686"/>
        <line x1="310" y1="674" x2="310" y2="684"/>
        <line x1="325" y1="672" x2="325" y2="682"/>
        <line x1="340" y1="670" x2="340" y2="680"/>

        <line x1="885" y1="662" x2="885" y2="672"/>
        <line x1="900" y1="664" x2="900" y2="674"/>
        <line x1="915" y1="667" x2="915" y2="677"/>
        <line x1="930" y1="670" x2="930" y2="680"/>
        <line x1="945" y1="673" x2="945" y2="683"/>
        <line x1="960" y1="676" x2="960" y2="686"/>
        <line x1="975" y1="677" x2="975" y2="687"/>
      </g>

      <!-- FRONT WHEEL LOCK EYELET GROMMET -->
      <g transform="translate(295, 645)">
        <circle cx="0" cy="0" r="13" fill="#181A1D" stroke="#2B2D33" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8.5" fill="#282A30" stroke="#484C55" stroke-width="2"/>
        <circle cx="0" cy="0" r="4.5" fill="#0A0B0C"/>
      </g>

      <!-- WINDPROOF BUCKLE STRAP ACCENT -->
      <g transform="translate(615, 663)">
        <rect x="0" y="0" width="16" height="8" rx="2" fill="#32353B" stroke="#121315" stroke-width="1"/>
        <line x1="8" y1="0" x2="8" y2="8" stroke="#121315" stroke-width="1.5"/>
      </g>
    </g>
  </g>
</svg>`;
};

async function run() {
  const svg = createBikeCoverSvg();
  const dest = path.join(targetDir, 'bike-cover.webp');
  
  await sharp(Buffer.from(svg))
    .webp({ quality: 95 })
    .toFile(dest);
    
  console.log('Successfully created:', dest);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
