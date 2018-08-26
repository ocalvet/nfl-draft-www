import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


export default ({ player, onDraftPlayer }) => {
  const drafted = player.draftedBy && player.draftedBy.length > 0;
  const color = drafted ? '#ddd' : 'black';
  return (
    <div style={{ paddingTop: 4, paddingBottom: 4, marginTop: 2, marginBottom: 2, color, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <div style={{ flex: 1.5 }}>{player.displayName}</div>
      <div style={{ flex: 1 }}>{player.position}</div>
      <div style={{ flex: 1.5 }}>{player.team.fullName}</div>
      <div style={{ flex: 1 }}>{player.depth}</div>
      <div style={{ flex: 1 }}>{player.tier ? player.tier.tier : ''}</div>
      <div style={{ flex: 1 }}>{player.nerdRank}</div>
      <div style={{ flex: 1 }}>{player.byeWeek}</div>
      <div style={{ flex: 1.2, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Select
            value={player.draftedBy || ''}
            style={{ width: '100%' }}
            onChange={(event) => onDraftPlayer(player, event.target.value)}
            inputProps={{
              name: 'draftedBy',
              id: 'draftedBy-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'j'}>John</MenuItem>
            <MenuItem value={'c'}>Chris</MenuItem>
            <MenuItem value={'f'}>Faisal</MenuItem>
            <MenuItem value={'m'}>Mike</MenuItem>
            <MenuItem value={'w'}>Wendy</MenuItem>
            <MenuItem value={'o'}>Ovi</MenuItem>
            <MenuItem value={'ca'}>Cato</MenuItem>
            <MenuItem value={'b'}>Brett</MenuItem>
            <MenuItem value={'ma'}>Mark</MenuItem>
            <MenuItem value={'u'}>UNK</MenuItem>
          </Select>
      </div>
    </div>
  );
}
