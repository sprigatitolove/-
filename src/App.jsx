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
        { label: '세미 롱', front: '/bonbon/bonbonhair_semi_hair.png', back: '/bonbon/bonbonhair_semi_back.png' },
        { label: '만두 머리', front: null, back: '/bonbon/bonbonhair_mandu_back.png' }, { label: '도넛 머리', front: null, back: '/bonbon/bonbonhair_donut_back.png' },],
      hat: [], 
      inner: [], 
      outer: [], 
      onepiece: [], 
      shoes: [ { label: '딸기 슬리퍼', image: '/bonbon/bonbon_strawberryslipper.png' },

      ], 
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
        { label: '생머리', front: '/angel/angelhair_long_front.png', back: '/angel/angelhair_long_back.png' },
        { label: '양갈래', front: null, back: '/angel/angelhair_twintail_back.png' },
        { label: '묶은 머리', front: null, back: '/angel/angelhair_ponytail_back.png' },
        { label: '넘긴 머리', front: '/angel/angelhair_clean_front.png', back: '/angel/angelhair_long_back.png' },
      ],
      hat: [], inner: [], 
      outer: [
        { label: '스포츠 자켓', image: '/angel/angel_sportjacket.png' },
        { label: '니트 가디건', image: '/angel/angel_cardigan.png' },
      ], 
      onepiece: [{ label: '하얀 원피스', image: '/angel/angel_whitedress.png' },
      ], 
      shoes: [], socks: [], accessory: []
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
characters.forEach(c => {
  const firstHair = c.outfits.hair?.[0];
  c.defaultHair = firstHair
    ? { front: firstHair.front || null, back: firstHair.back || null }
    : { front: null, back: null };
});

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characterImages, setCharacterImages] = useState({});
  const [activeCategory, setActiveCategory] = useState('top');
const setDefaultHair = (charId) => {
  const char = characters.find(c => c.id === charId);
  if (!char || !char.defaultHair) return;

  setCharacterImages(prev => ({
    ...prev,
    [charId]: {
      ...prev[charId],
      hairFront: char.defaultHair.front,
      hairBack: char.defaultHair.back
    }
  }));
};
  const randomizeCharacter = (charId, char) => {
    const newSelection = {};
    for (const category in char.outfits) {
      if (['set', 'accessory', 'hat'].includes(category)) continue;
      const options = char.outfits[category];
      if (options.length === 0) continue;

      if (category === 'hair') {
        const hair = options[Math.floor(Math.random() * options.length)];
        newSelection.hairFront = hair.front;
        newSelection.hairBack = hair.back;
      } else if (category === 'accessory') {
        const count = Math.floor(Math.random() * 3); // 0~2개
        newSelection.accessory = options.sort(() => 0.5 - Math.random()).slice(0, count).map(i => i.image || i);
      } else {
        const choice = options[Math.floor(Math.random() * options.length)];
        newSelection[category] = choice.image || choice;
      }
    }

    setCharacterImages(prev => ({
      ...prev,
      [charId]: newSelection
    }));
  };

  const resetCharacter = (charId) => {
    setCharacterImages(prev => ({
      ...prev,
      [charId]: {}
    }));
  };

  const randomizeAllCharacters = () => {
    const newImages = {};
    selectedCharacters.forEach(charId => {
      const char = characters.find(c => c.id === charId);
      if (!char) return;

      const selection = {};
      for (const category in char.outfits) {
        if (['set', 'accessory', 'hat'].includes(category)) continue;
        const options = char.outfits[category];
        if (options.length === 0) continue;

        if (category === 'hair') {
          const hair = options[Math.floor(Math.random() * options.length)];
          selection.hairFront = hair.front;
          selection.hairBack = hair.back;
        } else if (category === 'accessory') {
          const count = Math.floor(Math.random() * 3);
          selection.accessory = options.sort(() => 0.5 - Math.random()).slice(0, count).map(i => i.image || i);
        } else {
          const choice = options[Math.floor(Math.random() * options.length)];
          selection[category] = choice.image || choice;
        }
      }

      newImages[charId] = selection;
    });

    setCharacterImages(newImages);
  };

  const resetAllCharacters = () => {
    setCharacterImages({});
  };

  const handleChange = (charId, category, image) => {
    setCharacterImages(prev => {
      const updated = { ...prev[charId] };

      if (image === null) {
        if (category === 'accessory') {
          updated.accessory = [];
        } else if (category === 'hair') {
          updated.hairFront = null;
          updated.hairBack = null;
        } else {
          updated[category] = null;
        }
      } else {
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

        if (category === 'set' && image) {
          updated.top = null;
          updated.bottom = null;
          updated.onepiece = null;
        }
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

  // ✅ 캐릭터가 없을 때 추가되었는지 확인하고 헤어 설정
  if (!selectedCharacters.includes(char.id) && selectedCharacters.length < 4) {
    setCharacterImages(prevImages => ({
      ...prevImages,
      [char.id]: {
        ...prevImages[char.id],
        hairFront: char.defaultHair?.front || null,
        hairBack: char.defaultHair?.back || null
      }
    }));
  } // ← 여기까지가 if문!
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
  {/* 기존 옵션들 */}
  {Object.keys(char.outfits).includes(activeCategory) &&
    char.outfits[activeCategory]?.map(item => (
      <div
        key={item.label}
        onClick={() => handleChange(charId, activeCategory, item.image || item)}
        className="option"
      >
        {item.label || item}
      </div>
    ))}

  {/* 벗기 버튼 - 별도 스타일 클래스 추가 */}
  {Object.keys(char.outfits).includes(activeCategory) && (
    <div
      onClick={() => handleChange(charId, activeCategory, null)}
      className="option strip-button"
    >
      X
    </div>
    
  )}
  
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

      <div className="footer-buttons">
        <button className="reset" onClick={resetAllCharacters}>RESET</button>
        <button className="random" onClick={randomizeAllCharacters}>random</button>
      </div>

    </div>
    
  );
}

export default App;
