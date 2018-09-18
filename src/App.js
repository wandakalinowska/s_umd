import React, { Component } from 'react';
import Board from './Board';
import sudoku from 'sudoku-umd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      level: 'easy'
    };
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleSolve = this.handleSolve.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    
  }

  handleNewGame(e) {
    const newSudoku = sudoku.generate(this.state.level);
    this.setState({
      initialBoard: newSudoku,
      board: newSudoku
    });
    
    console.log(newSudoku);
    sudoku.print_board(newSudoku);
  }

  handleSolve(e) {
    const solve = sudoku.solve(this.state.board);
    if (solve === false) {
      alert ('There is no solution.\nYou should improve your sudoku.');
    } else {
      this.setState({
        board: solve
      });
    }
  }

  handleRestart(e) {
    const restart = this.state.initialBoard;
    this.setState({
      board: restart
    });
  }

  handleCheck(e) {
    const check = sudoku.solve(this.state.board);
    if (check === false) {
      alert ('There is no solution.\nYour sudoku must be corrected.');
    } else {
      alert ('You are on the good way.\nKeep going!');
    }
  }

  updateBoard(id, tile) {
    const updatedBoard = this.state.board.split('');
    const checkTile = (tile !== '') ? tile : '.'; 
    updatedBoard.splice(id, 1, checkTile);
    const newBoard = updatedBoard.join('');
    this.setState({
      board: newBoard
    });
  }

  changeLevel(level) {
    this.setState({
      level
    });
    this.handleNewGame()
  }

  render() {
    if (this.state.initialBoard === '') this.handleNewGame();
    return (
      <div className={'container'}>
      <h1>Sudoku</h1>
        <div className={'buttons'}>
            <button className={'new_button'} onClick={this.handleNewGame}>New Game</button>
            <button className={'check_button'} onClick={this.handleCheck}>Check</button>
            <button className={'solve_button'} onClick={this.handleSolve}>Solve</button>
            <button className={'restart_button'} onClick={this.handleRestart}>Restart</button>
        </div>
        <div className={'buttons level_buttons'}>
        	<h3>Select </h3>
        	<h2>level</h2>
            <button className={'easy_button'} onClick={() => this.changeLevel('easy')}>Easy</button>
        	<button className={'medium_button'} onClick={() => this.changeLevel('medium')}>Medium</button>
        	<button className={'hard_button'} onClick={() => this.changeLevel('hard')}>Hard</button>
        	<button className={'very_hard_button'} onClick={() => this.changeLevel('very-hard')}>Very hard</button>
        	<button className={'insane_button'} onClick={() => this.changeLevel('insane')}>Insane</button>
        	<button className={'inhuman_button'} onClick={() => this.changeLevel('inhuman')}>Inhuman</button>
        </div>
        <Board board={this.state.board}
               initialBoard={this.state.initialBoard}
               updateBoard={this.updateBoard}/>
      </div>
    );
  }
}

export default App;
