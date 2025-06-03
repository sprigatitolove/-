import { useState } from 'react';
import './App.css';

const characters = [
  {
    id: 'bonbon',
    name: 'Bonbon',
    color: '#B33A32',
    textColor: '#fff',
    base: '/bonbon/bonbonbase.png',
    outfits: {
      set: [ { label: '교복', image: '/bonbon/bonbon_uniform.png' } ],
      top: [
        { label: '줄무늬 셔츠', image: '/bonbon/bonbon_stripeshirts.png' },
        { label: '회색 후드집업', image: '/bonbon/bonbon_grayhoodie.png' }
      ],
      bottom: [ { label: '청바지', image: '/bonbon/bonbon_denimjean.png' } ],
      hair: [
        { label: '세미 롱', front: '/bonbon/bonbonhair_semi_hair.png', back: '/bonbon/bonbonhair_semi_back.png' }
      ],
      hat: [], 
      inner: [], 
      outer: [], 
      onepiece: [], 
      shoes: [], 
      socks: [], 
      accessory: []
    }
  },
  {
    id: 'sugar',
    name: 'Sugar',
    color: '#DCEEFF',
    textColor: '#000',
    base: '/sugar/sugarbase.png',
    outfits: {
      set: [ { label: '교복', image: '/sugar/sugar_uniform.png' } ],
      top: [], bottom: [],
      hair: [
        { label: '부스스한 머리', front: '/sugar/sugarhair_long_front.png', back: '/sugar/sugarhair_long_back.png' },
        { label: '곰돌이 트윈테일', front: null, back: '/sugar/sugarhair_teddybeartwintail.png' }
      ],
      hat: [
        { label: '곰돌이 모자', image: '/sugar/sugar_bearhat.png' }
      ], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []
    }
  },
  {
    id: 'honey',
    name: 'Honey',
    color: '#FFFACD',
    textColor: '#000',
    base: '/honey/honeybase.png',
    outfits: {
      set: [ { label: '교복', image: '/honey/honey_uniform.png' } ],
      top: [], bottom: [], hair: [], hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []
    }
  },
  {
    id: 'angel',
    name: 'Angel',
    color: '#ffffff',
    textColor: '#777',
    base: '/angel/angelbase.png',
    outfits: {
      set: [ { label: '교복', image: '/angel/angel_uniform.png' } ],
      top: [], bottom: [],
      hair: [
        { label: '롱헤어', front: '/angel/angelhair_long_front.png', back: '/angel/angelhair_long_back.png' }
      ],
      hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []
    }
  },
  {
    id: 'jelly',
    name: 'Jelly',
    color: '#4B0082',
    textColor: '#fff',
    base: '/jelly/jellybase.png',
    outfits: { 
      set: [{ label: '교복', image: '/jelly/jelly_uniform.png' }

      ], 
      top: [], 
      bottom: [], 
      hair: [ { label: '쇼트컷', front: '/jelly/jellyhair_short_front.png', back: '/jelly/jellyhair_short_back.png' }

      ], 
      hat: [], 
      inner: [], 
      outer: [], onepiece: [], shoes: [], socks: [], accessory: [] }
  },
  {
    id: 'valentine',
    name: 'Valentine',
    color: '#000000',
    textColor: '#fff',
    base: '/valentine/valentinebase.png',
    outfits: { 
      set: [ { label: '교복', image: '/valentine/valentine_uniform.png' }

      ], 
      top: [], 
      bottom: [], 
      hair: [{
    label: '캐주얼 롱헤어',
    front: '/valentine/valentinehair_casual_front.png',
    back: '/valentine/valentinehair_casual_back.png'}
  ], 
      hat: [], 
      inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: [] }
  },
  {
    id: 'cherry',
    name: 'Cherry',
    color: '#fff0f5',
    textColor: '#f4a8b8',
    base: '/cherry/cherrybase.png',
    outfits: { 
      set: [ { label: '교복', image: '/cherry/cherry_uniform.png' }
        
      ], 
      top: [], 
      bottom: [], 
      hair: [ {
    label: '클래식 컬',
    front: '/cherry/cherryhair_classic_front.png',
    back: '/cherry/cherryhair_classic_back.png'
  }
], 
      hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: [] }
  }
];

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characterImages, setCharacterImages] = useState({});
  const [activeCategory, setActiveCategory] = useState('top');

  const handleChange = (charId, category, image) => {
    setCharacterImages(prev => {
      const updated = { ...prev[charId] };
      if (category === 'accessory') {
        const acc = updated.accessory || [];
        updated.accessory = acc.includes(image)
          ? acc.filter(i => i !== image)
          : [...acc, image];
      } else if (category === 'hair') {
        updated.hairFront = image.front;
        updated.hairBack = image.back;
      } else {
        updated[category] = image;
      }
      return { ...prev, [charId]: updated };
    });
  };

  const toggleCharacter = (char) => {
    setSelectedCharacters(prev =>
      prev.includes(char.id)
        ? prev.filter(id => id !== char.id)
        : prev.length < 4
          ? [...prev, char.id]
          : prev
    );
  };

  return (
    <div className="app">
      <div className="character-row">
        {characters.map(char => (
          <button
            key={char.id}
            onClick={() => toggleCharacter(char)}
            style={{ backgroundColor: char.color, color: char.textColor }}
            className={selectedCharacters.includes(char.id) ? 'character-button active' : 'character-button'}
          >
            {char.name}
          </button>
        ))}
      </div>

      <div className="main multi-view">
        {selectedCharacters.map(charId => {
          const char = characters.find(c => c.id === charId);
          const selected = characterImages[charId] || {};
          return (
            <div key={charId} className="viewer-zone">
              <div className="viewer">
                {selected.hairBack && <img src={selected.hairBack} className="layer hairBack" alt="hairBack" />}
                <img src={char.base} className="layer base" alt="base" />
                {selected.accessoryBack && selected.accessoryBack.map((img, i) => (
                  <img key={`ab-${i}`} src={img} className="layer accessory-back" alt={`accessoryBack-${i}`} />
                ))}
                {selected.socks && <img src={selected.socks} className="layer socks" alt="socks" />}
                {selected.bottom && <img src={selected.bottom} className="layer bottom" alt="bottom" />}
                {selected.inner && <img src={selected.inner} className="layer inner" alt="inner" />}
                {selected.top && <img src={selected.top} className="layer top" alt="top" />}
                {selected.onepiece && <img src={selected.onepiece} className="layer onepiece" alt="onepiece" />}
                {selected.set && <img src={selected.set} className="layer set" alt="set" />}
                {selected.outer && <img src={selected.outer} className="layer outer" alt="outer" />}
                {selected.shoes && <img src={selected.shoes} className="layer shoes" alt="shoes" />}
                {selected.accessory && selected.accessory.map((img, i) => (
                  <img key={`af-${i}`} src={img} className="layer accessory-front" alt={`accessory-${i}`} />
                ))}
                {selected.hat && <img src={selected.hat} className="layer hat" alt="hat" />}
                {selected.hairFront && <img src={selected.hairFront} className="layer hairFront" alt="hairFront" />}
              </div>
              <div className="option-panel">
                {Object.keys(char.outfits).includes(activeCategory) && char.outfits[activeCategory]?.map(item => (
                  <div
                    key={item.label}
                    onClick={() => handleChange(charId, activeCategory, item.image || item)}
                    className="option"
                  >
                    {item.label || item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="sidebar">
          {[ 'set', 'top', 'bottom', 'inner', 'outer', 'onepiece', 'socks', 'shoes', 'hair', 'hat', 'accessory' ].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
