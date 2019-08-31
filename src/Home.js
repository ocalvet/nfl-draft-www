import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Player from './Player';

export default ({
  players,
  showDrafted,
  onFilteringDrafted,
  onDraftPlayer
}) => {
  return (
    <div>
      <div
        style={{
          paddingTop: 4,
          alignItems: 'center',
          paddingBottom: 4,
          marginTop: 2,
          marginBottom: 2,
          fontWeight: 'bolder',
          fontVariant: 'small-caps',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1.5 }}>Player</div>
        <div style={{ flex: 1 }}>Position</div>
        <div style={{ flex: 1.5 }}>Team</div>
        <div style={{ flex: 1 }}>Depth</div>
        <div style={{ flex: 1 }}>Tier</div>
        <div style={{ flex: 1 }}>Nerd Rank</div>
        <div style={{ flex: 1 }}>Bye Week</div>
        <div style={{ flex: 1.2 }}>
          Show drafted
          <Checkbox
            checked={showDrafted}
            onChange={onFilteringDrafted}
            value="drafted"
          />
        </div>
      </div>
      <hr />
      {players && players.length > 0
        ? players.map(p => (
            <Player key={p.playerId} player={p} onDraftPlayer={onDraftPlayer} />
          ))
        : null}
    </div>
  );
};
