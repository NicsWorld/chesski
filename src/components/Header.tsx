import type { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  view: 'game' | 'tutorial';
  setView: Dispatch<SetStateAction<'game' | 'tutorial'>>;
  pieceTheme: 'zoo' | 'standard';
  setPieceTheme: Dispatch<SetStateAction<'zoo' | 'standard'>>;
}

function Header({ view, setView, pieceTheme, setPieceTheme }: HeaderProps) {
  return (
    <header className="app-header">
      <h1>Zoo Chess</h1>
      <p>Learn to play with animal friends!</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          className={view === 'game' ? '' : 'btn-secondary'}
          onClick={() => setView('game')}
        >
          Play Game
        </button>
        <button
          className={view === 'tutorial' ? '' : 'btn-secondary'}
          onClick={() => setView('tutorial')}
        >
          Tutorials
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
          <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Theme:</span>
          <button
            className="btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: pieceTheme === 'zoo' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
            onClick={() => setPieceTheme('zoo')}
          >
            Zoo
          </button>
          <button
            className="btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: pieceTheme === 'standard' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
            onClick={() => setPieceTheme('standard')}
          >
            Standard
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
