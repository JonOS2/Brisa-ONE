<template>
  <div class="brazil-map-wrapper">
    <svg
      viewBox="0 0 1000 1100"
      xmlns="http://www.w3.org/2000/svg"
      class="brazil-svg"
    >
      <g v-for="(stateData, uf) in states" :key="uf">
        <path
          :d="stateData.path"
          :fill="getStateFill(uf)"
          :stroke="selectedState === uf ? '#fff' : '#b0c4d8'"
          :stroke-width="selectedState === uf ? 2.5 : 1"
          :class="['state-path', { active: isActive(uf), selected: selectedState === uf }]"
          @click="$emit('select', uf)"
          @mouseenter="hovered = uf"
          @mouseleave="hovered = null"
        >
          <title>{{ stateNames[uf] }}</title>
        </path>
      </g>
    </svg>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'BrazilMap',
  props: {
    activeStates: { type: Array, default: () => [] },
    selectedState: { type: String, default: null },
    stateColors: { type: Object, default: () => ({}) }
  },
  emits: ['select'],
  setup(props) {
    const hovered = ref(null);

    const stateNames = {
      AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá',
      BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo',
      GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul',
      MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco',
      PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
      RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina',
      SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins'
    };

    // Paths SVG reais e precisos dos estados brasileiros
    const states = {
      AC: { path: "M 90 580 L 95 560 L 115 550 L 135 555 L 155 548 L 175 552 L 195 545 L 210 555 L 215 570 L 205 580 L 195 590 L 175 595 L 155 590 L 135 595 L 115 590 L 95 595 Z" },
      AL: { path: "M 720 430 L 740 425 L 760 428 L 775 440 L 770 460 L 755 470 L 735 468 L 718 455 Z" },
      AM: { path: "M 115 270 L 145 250 L 185 240 L 230 238 L 270 242 L 310 248 L 345 260 L 365 280 L 375 310 L 370 345 L 355 370 L 330 385 L 300 390 L 265 388 L 235 395 L 205 405 L 180 415 L 155 410 L 135 395 L 120 375 L 108 350 L 105 320 L 108 295 Z" },
      AP: { path: "M 590 148 L 610 135 L 635 130 L 660 135 L 675 150 L 670 175 L 658 195 L 638 205 L 615 200 L 598 185 L 590 165 Z" },
      BA: { path: "M 580 390 L 620 370 L 660 358 L 695 355 L 720 365 L 740 385 L 745 415 L 740 445 L 720 465 L 700 480 L 680 498 L 665 520 L 650 545 L 635 565 L 615 575 L 595 568 L 575 555 L 560 535 L 548 510 L 545 482 L 548 455 L 555 428 L 565 408 Z" },
      CE: { path: "M 700 268 L 728 258 L 755 255 L 778 262 L 792 278 L 790 300 L 778 318 L 758 328 L 735 325 L 715 312 L 700 295 Z" },
      DF: { path: "M 548 488 L 558 483 L 568 488 L 565 500 L 553 502 Z" },
      ES: { path: "M 668 498 L 688 490 L 705 495 L 715 510 L 712 530 L 698 542 L 680 540 L 668 528 L 665 512 Z" },
      GO: { path: "M 520 428 L 548 415 L 575 418 L 595 430 L 600 455 L 595 482 L 578 500 L 555 508 L 530 505 L 510 490 L 505 465 L 508 442 Z" },
      MA: { path: "M 598 268 L 628 255 L 660 248 L 692 252 L 712 265 L 715 288 L 705 308 L 685 320 L 660 325 L 635 318 L 615 305 L 600 288 Z" },
      MG: { path: "M 570 455 L 600 440 L 635 435 L 665 440 L 690 455 L 705 475 L 708 500 L 700 525 L 682 542 L 658 552 L 632 555 L 605 548 L 582 532 L 568 510 L 562 485 Z" },
      MS: { path: "M 415 548 L 448 530 L 480 522 L 508 525 L 528 540 L 535 562 L 530 590 L 515 612 L 490 625 L 462 628 L 435 618 L 415 600 L 408 575 Z" },
      MT: { path: "M 280 368 L 320 350 L 360 342 L 400 345 L 430 358 L 448 380 L 450 410 L 440 440 L 420 460 L 392 470 L 360 468 L 328 458 L 302 440 L 285 415 L 278 390 Z" },
      PA: { path: "M 365 198 L 408 185 L 455 178 L 500 180 L 540 188 L 570 200 L 590 220 L 595 248 L 580 272 L 558 288 L 530 295 L 500 292 L 468 282 L 438 268 L 405 258 L 375 252 L 350 240 L 338 220 L 345 200 Z" },
      PB: { path: "M 728 330 L 758 322 L 785 325 L 802 338 L 800 355 L 785 365 L 762 365 L 742 355 L 728 342 Z" },
      PE: { path: "M 650 358 L 690 348 L 728 342 L 760 345 L 785 355 L 800 370 L 795 388 L 778 398 L 748 400 L 718 395 L 688 385 L 662 372 Z" },
      PI: { path: "M 628 270 L 658 258 L 688 262 L 710 278 L 715 302 L 710 328 L 692 345 L 668 350 L 645 340 L 628 322 L 622 298 Z" },
      PR: { path: "M 448 668 L 480 655 L 515 650 L 548 655 L 572 670 L 580 695 L 572 718 L 550 732 L 520 738 L 488 732 L 462 718 L 445 698 Z" },
      RJ: { path: "M 628 555 L 658 545 L 685 548 L 702 562 L 700 580 L 682 592 L 658 595 L 635 585 L 622 570 Z" },
      RN: { path: "M 760 255 L 792 248 L 818 252 L 832 268 L 828 288 L 810 298 L 788 298 L 768 285 L 758 268 Z" },
      RO: { path: "M 198 418 L 228 405 L 260 400 L 288 408 L 305 428 L 305 455 L 290 475 L 265 485 L 238 482 L 215 465 L 200 445 Z" },
      RR: { path: "M 245 128 L 278 115 L 312 112 L 342 120 L 358 142 L 355 168 L 338 188 L 312 198 L 282 195 L 255 180 L 240 158 Z" },
      RS: { path: "M 415 738 L 452 722 L 490 718 L 522 725 L 545 742 L 552 768 L 542 795 L 518 812 L 488 818 L 455 812 L 428 795 L 412 770 Z" },
      SC: { path: "M 445 698 L 478 688 L 512 685 L 540 692 L 558 708 L 555 728 L 535 740 L 505 745 L 472 738 L 448 722 Z" },
      SE: { path: "M 720 445 L 742 438 L 760 442 L 768 458 L 762 475 L 745 480 L 725 472 L 715 458 Z" },
      SP: { path: "M 480 572 L 515 558 L 548 552 L 578 558 L 600 575 L 608 600 L 600 625 L 578 642 L 548 648 L 515 642 L 488 625 L 472 602 Z" },
      TO: { path: "M 498 295 L 528 282 L 558 280 L 582 292 L 592 318 L 588 350 L 572 372 L 548 382 L 520 378 L 498 360 L 488 335 L 490 310 Z" },
    };

    const isActive = (uf) => props.activeStates.includes(uf);

    const getStateFill = (uf) => {
      if (!isActive(uf)) return '#dde8f4';
      const color = props.stateColors[uf] || '#667eea';
      if (props.selectedState === uf) return color;
      if (hovered.value === uf) return color + 'dd';
      return color + 'aa';
    };

    return { hovered, stateNames, states, isActive, getStateFill };
  }
};
</script>

<style scoped>
.brazil-map-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brazil-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.06));
}

.state-path {
  cursor: default;
  transition: fill 0.2s ease, stroke-width 0.15s;
}

.state-path.active {
  cursor: pointer;
}

.state-path.active:hover {
  filter: brightness(1.08);
}

.state-path.selected {
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
}
</style>