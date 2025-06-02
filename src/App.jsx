import { useState } from 'react';
import './App.css';

const characters = [
  {
    id: 'bonbon',
    name: 'Bonbon',
    color: '#B33A32',
    textColor: '#fff',
    base: '/bonbonbase.png',
    outfits: {
      set: [
        { label: '교복', image: '/bonbon_uniform.png' }
      ],
      top: [
        { label: '줄무늬 셔츠', image: '/bonbon_shirt1.png' },
        { label: '회색 후드집업', image: '/bonbon_top2.png' }
      ],
      bottom: [
        { label: '청바지', image: '/bonbon_pants1.png' }
      ],
      hair: [],
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
    base: '/sugarbase.png',
    outfits: { 
      set: [ { label: '교복', image: '/sugar_uniform.png' } ],
      top: [], 
      bottom: [], 
      hair: [], 
      hat: [], 
      inner: [], 
      outer: [], 
      onepiece: [], 
      shoes: [], 
      socks: [], 
      accessory: [] }
  },
   {
    id: 'honey',
    name: 'Honey',
    color: '#FFFACD',
    textColor: '#000',
    base: '/honeybase.png',
    outfits: {
      set: [], 
      top: [], 
      bottom: [], 
      hair: [], 
      hat: [], 
      inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []}
  },
  {
    id: 'angel',
    name: 'Angel',
    color: '#ffffff',
    textColor: '#777',
    base: '/angelbase.png',
    outfits: {set: [], top: [], bottom: [], hair: [], hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []}
  },
  {
    id: 'jelly',
    name: 'Jelly',
    color: '#4B0082',
    textColor: '#fff',
    base: '/jellybase.png',
    outfits: {set: [], top: [], bottom: [], hair: [], hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []}
  },
  {
    id: 'valentine',
    name: 'Valentine',
    color: '#000000',
    textColor: '#fff',
    base: '/valentinebase.png',
    outfits: {set: [], top: [], bottom: [], hair: [], hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []}
  },
  {
    id: 'cherry',
    name: 'Cherry',
    color: '#fff0f5',
    textColor: '#f4a8b8',
    base: '/cherrybase.png',
    outfits: {set: [], top: [], bottom: [], hair: [], hat: [], inner: [], outer: [], onepiece: [], shoes: [], socks: [], accessory: []}
  }
];

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [selectedImages, setSelectedImages] = useState({
  set: null,
  top: null,
  bottom: null,
  hairFront: null,
  hairBack: null,
  hat: null,
  inner: null,
  outer: null,
  onepiece: null,
  shoes: null,
  socks: null,
  accessory: [], // front
  accessoryBack: [] // ← 추가됨
  });
  const [activeCategory, setActiveCategory] = useState('top');

  const handleChange = (category, image) => {
    if (category === 'accessory') {
      setSelectedImages(prev => {
        const alreadySelected = prev.accessory.includes(image);
        return {
          ...prev,
          accessory: alreadySelected ? prev.accessory.filter(i => i !== image) : [...prev.accessory, image]
        };
      });
    } else if (category === 'hair') {
      setSelectedImages(prev => ({
        ...prev,
        hairFront: image.front,
        hairBack: image.back
      }));
    } else {
      setSelectedImages(prev => ({ ...prev, [category]: image }));
    }
  };

  const clearCategory = (category) => {
    if (category === 'accessory') {
      setSelectedImages(prev => ({ ...prev, accessory: [] }));
    } else if (category === 'hair') {
      setSelectedImages(prev => ({ ...prev, hairFront: null, hairBack: null }));
    } else {
      setSelectedImages(prev => ({ ...prev, [category]: null }));
    }
  };

  return (
    <div className="app">
      <div className="character-row">
        {characters.map(char => (
          <button
            key={char.id}
            onClick={() => {
              setSelectedCharacter(char);
              setSelectedImages({
                  set: null, top: null, bottom: null, hairFront: null, hairBack: null, hat: null, inner: null, outer: null, onepiece: null, shoes: null, socks: null, accessory: [], // front accessoryBack: [] // ← 추가됨
              });
            }}
            style={{ backgroundColor: char.color, color: char.textColor }}
            className="character-button"
          >
            {char.name}
          </button>
        ))}
      </div>

      <div className="main">
        <div className="sidebar">
          {['set', 'top', 'bottom', 'inner', 'outer', 'onepiece', 'socks', 'shoes', 'hair', 'hat', 'accessory'].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
          <button onClick={() => setSelectedImages({
              set: null,
  top: null,
  bottom: null,
  hairFront: null,
  hairBack: null,
  hat: null,
  inner: null,
  outer: null,
  onepiece: null,
  shoes: null,
  socks: null,
  accessory: [], // front
  accessoryBack: [] // ← 추가됨
          })}>전부 벗기기</button>
        </div>

        <div className="viewer-zone">
         <div className="viewer">
  {/* 머리 뒤 (헤어백은 base보다 아래로) */}
  {selectedImages.hairBack && <img src={selectedImages.hairBack} className="layer hairBack" alt="hairBack" />}
  
  {/* 캐릭터 기본 베이스 */}
  <img src={selectedCharacter.base} className="layer base" alt="base" />

  {/* 악세사리 뒤 */}
  {selectedImages.accessoryBack && selectedImages.accessoryBack.map((img, i) => (
    <img key={`ab-${i}`} src={img} className="layer accessoryBack" alt={`accessoryBack-${i}`} />
  ))}

  {/* 의상 레이어 */}
  {selectedImages.socks && <img src={selectedImages.socks} className="layer socks" alt="socks" />}
  {selectedImages.bottom && <img src={selectedImages.bottom} className="layer bottom" alt="bottom" />}
  {selectedImages.inner && <img src={selectedImages.inner} className="layer inner" alt="inner" />}
  {selectedImages.top && <img src={selectedImages.top} className="layer top" alt="top" />}
  {selectedImages.onepiece && <img src={selectedImages.onepiece} className="layer onepiece" alt="onepiece" />}
  {selectedImages.set && <img src={selectedImages.set} className="layer set" alt="set" />}
  {selectedImages.outer && <img src={selectedImages.outer} className="layer outer" alt="outer" />}
  {selectedImages.shoes && <img src={selectedImages.shoes} className="layer shoes" alt="shoes" />}

  {/* 악세사리 앞 */}
  {selectedImages.accessory && selectedImages.accessory.map((img, i) => (
    <img key={`af-${i}`} src={img} className="layer accessoryFront" alt={`accessory-${i}`} />
  ))}

  {/* 모자 */}
  {selectedImages.hat && <img src={selectedImages.hat} className="layer hat" alt="hat" />}
  
  {/* 앞머리 */}
  {selectedImages.hairFront && <img src={selectedImages.hairFront} className="layer hairFront" alt="hairFront" />}
</div>

          <div className="option-panel">
            {selectedCharacter.outfits[activeCategory]?.map(item => (
              <div
                key={item.label}
                onClick={() => handleChange(activeCategory, item.image || item)}
                className="option"
              >
                {item.label || item}
              </div>
            ))}
            {selectedCharacter.outfits[activeCategory]?.length > 0 && (
              <div className="option clear-option" onClick={() => clearCategory(activeCategory)}>
                {activeCategory === 'accessory' ? '악세사리 모두 벗기기' : '벗기기'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
