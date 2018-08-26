import React from 'react';

export default ({ player, onSelectPlayer }) => {
  return (
    <div onClick={() => onSelectPlayer(player.playerId)} style={{ paddingTop: 4, paddingBottom: 4, marginTop: 2, marginBottom: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <div style={{ flex: 3 }}>{player.displayName}</div>
      <div style={{ flex: 1 }}>{player.depth}</div>
      <div style={{ flex: 1 }}>{player.team}</div>
      <div style={{ flex: 1 }}>{player.nerdRank}</div>
      <div style={{ flex: 1 }}>{player.byeWeek}</div>
      <div style={{ flex: 1 }}>{player.position}</div>
    </div>
  );
}
