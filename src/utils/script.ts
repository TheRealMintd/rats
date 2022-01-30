const images = [
    '/dice-1.png', 
    '/dice-2.png', 
    '/dice-3.png', 
    '/dice-4.png', 
    '/dice-5.png', 
    '/dice-6.png'
];

const dice = document.querySelectorAll('img');

export function roll(): void {
    dice.forEach(function(die) {
        die.classList.add('shake');
    });
    setTimeout(function() {
        dice.forEach(function(die) {
            die.classList.remove('shake');
        });
        const dieOneValue: number = Math.floor(Math.random() * 6);
        const dieTwoValue: number = Math.floor(Math.random() * 6);
        const total: string = (dieOneValue + 1 + dieTwoValue + 1).toString();
        document.querySelector('#die-1')?.setAttribute('src', images[dieOneValue]);
        document.querySelector('#die-2')?.setAttribute('src', images[dieTwoValue]);
        document.querySelector('#total')!.innerHTML = 'The banquet goal is ' + total;
    },
    1000
    );
}