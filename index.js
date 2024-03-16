#!/usr/bin/env node

//index.js

//imports

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import playSound from 'play-sound';


//we define a player variable and a const for sound

let playerName;

const player = playSound({});

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); 


// Function to play sound
function playEffect(soundFile) {
  player.play(soundFile, (err) => {
      if (err) console.log(`Could not play sound: ${err}`);
  });
}

//starting screen function

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to the Ultimate Trivia Quiz! \n'
    );
    
    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgGreenBright(' HOW TO PLAY ')}
        Test your general knowledge.
        Answer all questions correctly to win.
        Good luck!

    `);
}

// Main function for handling answers 

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
      spinner.success({ text: `That's correct, well done ${playerName}!`});
      const correctAnimation = chalkAnimation.rainbow(`✨✨✨ Absolutely right! Great job, ${playerName}! ✨✨✨`); // Use chalkAnimation for a flashy effect
      await sleep(1000); // Let the animation run for 1 second
      correctAnimation.stop(); // Stop the animation to proceed with the game
      playEffect('./sounds/correct.mp3');
  } else {
      spinner.error({ text: `Oops, that's not right. Game over, ${playerName}!`}); 
      playEffect('./sounds/wrong.mp3');
      process.exit(1); // if the answer is wrong exit the game
  }
}

// function for the name input

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;

}

//upon completing the last question this function runs

function winner() {
  console.clear();
  figlet(`Congratulations, ${playerName}!`, (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    // Using a different gradient for more contrast
    console.log(gradient.pastel.multiline(data) + '\n');

    // Enhancing text visibility with bold and bright colors
    console.log(
      chalk.yellowBright.bold(
        `You've shown great knowledge today. Keep learning and challenging yourself!`
      )
    );
    playEffect('./sounds/win.mp3');
    process.exit(0);
  });
}


//question functions

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What year was the very first model of the iPhone released?\n',
        choices: ['2009', '2007', '2011', '2005'],
    });

    return handleAnswer(answers.question_1 === '2007');

}

async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'Which planet is the hottest in the solar system?\n',
      choices: ['Mercury', 'Jupiter', 'Venus', 'Mars'],
    });
    return handleAnswer(answers.question_2 === 'Venus');
  }
  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'Which country produces the most coffee in the world?\n',
      choices: ['Brazil', 'Vietnam', 'Colombia', 'Ethiopia'],
    });
  
    return handleAnswer(answers.question_3 === 'Brazil');
  }
  
  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'What is the smallest country in the world?\n',
      choices: ['Nauru', 'Vatican City', 'Monaco', 'Liechtenstein'],
    });
    return handleAnswer(answers.question_4 === 'Vatican City');
  }
  
  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: 'What is the longest river in the world?\n',
      choices: ['Nile', 'Mississippi', 'Amazon', 'Yangtze'],
    }
    );
  
    return handleAnswer(answers.question_5 === 'Amazon');
  }


  async function question6() {
    const answers = await inquirer.prompt({
      name: 'question_6',
      type: 'list',
      message: 'What element does "O" represent on the periodic table?\n',
      choices: ['Gold', 'Osmium', 'Iron', 'Oxygen'],
    }
    );
  
    return handleAnswer(answers.question_6 === 'Oxygen');
  }

  async function question7() {
    const answers = await inquirer.prompt({
      name: 'question_7',
      type: 'list',
      message: 'In what year did the Titanic sink?\n',
      choices: ['1915', '1905', '1912', '1920'],
    }
    );
  
    return handleAnswer(answers.question_7 === '1912');
  }

  async function question8() {
    const answers = await inquirer.prompt({
      name: 'question_8',
      type: 'list',
      message: 'What is the capital city of Spain?\n',
      choices: ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
    }
    
    );
  
    return handleAnswer(answers.question_8 === 'Madrid');
  }

  async function question9() {
    const answers = await inquirer.prompt({
      name: 'question_9',
      type: 'list',
      message: 'How many elements are in the periodic table?\n',
      choices: ['112', '126', '118', '120'],
    }    
    );
  
    return handleAnswer(answers.question_9 === '118');
  }

  async function question10() {
    const answers = await inquirer.prompt({
      name: 'question_10',
      type: 'list',
      message: 'Which mammal is known to have the most powerful bite in the world?\n',
      choices: ['Great White Shark', 'Crocodile', 'African Lion', 'Hippopotamus'],
    }    
    );
  
    return handleAnswer(answers.question_10 === 'Crocodile');
  }


// we clear the console and run the questions in order and then the winner function
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
winner();