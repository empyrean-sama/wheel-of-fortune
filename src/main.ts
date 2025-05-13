import { sectors, sectorColors } from './globalProp';
import { initialize } from './init';
import { startDrawFrame } from './drawFrame';

// Regenerate the sectors whenever an input is made on the entries text area
const entriesTextArea = document.getElementById('entries-text-area') as HTMLTextAreaElement;
entriesTextArea.addEventListener('input', function(e: Event) {
    sectors.splice(0, sectors.length);
    const sectorNames = this.value.trim().split('\n').filter((name) => name !== '');
    const sectorSize  = 360 / sectorNames.length;
    let seek = 0;
    sectorNames.forEach((name: string, index: number) => {
        let colorIndex = index % sectorColors.length;
        if(index === sectorNames.length - 1 && colorIndex === 0 ) {
            // do not allow two of the same colors to be side by side
            colorIndex = 1;
        }

        sectors.push({
            name: name,
            startAngle: seek,
            degrees: sectorSize,
            fillColor: sectorColors[colorIndex]
        });
        seek += sectorSize;
    });
});

initialize();
startDrawFrame();