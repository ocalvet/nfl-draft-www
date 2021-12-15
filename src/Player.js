import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default ({ player, onDraftPlayer }) => {
  const drafted = player.draftedBy && player.draftedBy.length > 0;
  const color = drafted ? '#ddd' : 'black';
  return (
    <div
      style={{
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 2,
        marginBottom: 2,
        color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ flex: 1.5 }}>{player.displayName}</div>
      <div style={{ flex: 1 }}>{player.position}</div>
      <div style={{ flex: 1.5 }}>{player.team.fullName}</div>
      <div style={{ flex: 1 }}>{player.depth}</div>
      <div style={{ flex: 1 }}>{player.tier ? player.tier.tier : ''}</div>
      <div style={{ flex: 1 }}>{player.nerdRank}</div>
      <div style={{ flex: 1 }}>{player.byeWeek}</div>
      <div
        style={{
          flex: 1.2,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Select
          value={player.draftedBy || ''}
          style={{ width: '100%' }}
          onChange={event => onDraftPlayer(player, event.target.value)}
          inputProps={{
            name: 'draftedBy',
            id: 'draftedBy-simple'
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            Slobber Knockers
          <MenuItem value={'b'}>Playmakers</MenuItem>
          <MenuItem value={'ca'}>Five Star Generals</MenuItem>
          <MenuItem value={'c'}>Slobber Knockers</MenuItem>
          <MenuItem value={'f'}>Yo Belichick Yo Self</MenuItem>
          <MenuItem value={'jc'}>Dolphins 'are good'</MenuItem>
          <MenuItem value={'j'}>Falcons</MenuItem>
          <MenuItem value={'ma'}>Brawlers Work Shop</MenuItem>
          <MenuItem value={'m'}>Deflated Futballs</MenuItem>
          <MenuItem value={'r'}>Flash me your Chubb</MenuItem>
          <MenuItem value={'jd'}>Mile High</MenuItem>
          <MenuItem value={'o'}>Mutant Penguinz</MenuItem>
          <MenuItem value={'w'}>Calvet 3</MenuItem>
        </Select>
      </div>
    </div>
  );
};
