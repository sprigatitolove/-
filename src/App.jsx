import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characterImages, setCharacterImages] = useState({});
  const [activeCategory, setActiveCategory] = useState('top');
 const [characters, setCharacters] = useState([]); // characters를 상태로 관리 (빈 배열로 시작)
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // public/data 폴더 아래 characters.json이 있다고 가정하고 불러옵니다.
        const response = await fetch('/data/characters.json');

        if (!response.ok) { // 만약 파일을 못 찾으면 오류 메시지를 띄웁니다.
          throw new Error(`데이터를 불러오는 데 실패했습니다! (오류 코드: ${response.status})`);
        }

        let data = await response.json(); // JSON 파일을 JavaScript 데이터로 변환합니다.

        // 각 캐릭터에 defaultHair 설정 추가 (이전에 App.js 맨 아래 있던 그 코드입니다.)
        data.forEach(c => {
          const firstHair = c.outfits.hair?.[0];
          c.defaultHair = firstHair
            ? { front: firstHair.front || null, back: firstHair.back || null }
            : { front: null, back: null };
        });

        setCharacters(data); // 불러온 데이터를 characters 상태에 저장합니다.
      } catch (error) {
        console.error("캐릭터 데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchCharacters(); // 함수를 실행해서 데이터를 불러옵니다.
  }, []); // []는 이 코드가 웹사이트가 처음 시작될 때 딱 한 번만 실행되도록 합니다.
  
  const getRandomOutfitSelection = (char) => {
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
        const count = Math.floor(Math.random() * 3);
        newSelection.accessory = options.sort(() => 0.5 - Math.random()).slice(0, count).map(i => i.image || i);
      } else {
        const choice = options[Math.floor(Math.random() * options.length)];
        newSelection[category] = choice.image || choice;
      }
    }
    return newSelection;
  };

  const randomizeCharacter = (charId, char) => {
    setCharacterImages(prev => ({
      ...prev,
      [charId]: getRandomOutfitSelection(char)
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
      newImages[charId] = getRandomOutfitSelection(char);
    });
    setCharacterImages(newImages);
  };

  const resetAllCharacters = () => {
    setCharacterImages({});
  };

  const handleChange = (charId, category, item) => {
    setCharacterImages(prev => {
      const updated = { ...prev[charId] };

      if (item === null) {
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
          updated.accessory = acc.includes(item.image)
            ? acc.filter(i => i !== item.image)
            : [...acc, item.image];
        } else if (category === 'hair') {
          updated.hairFront = item.front;
          updated.hairBack = item.back;
        } else {
          updated[category] = item.image;
        }

        // --- 여기만 수정되었습니다 ---
        if (category === 'set' && item) {
          updated.top = null;
          updated.bottom = null;
          updated.onepiece = null;
          updated.outer = null;
          updated.inner = null;
          // socks, shoes는 초기화하지 않도록 제거
        }
        // --- 수정 끝 ---
      }
      return { ...prev, [charId]: updated };
    });
  };

  const toggleCharacter = (char) => {
    setSelectedCharacters(prev => {
      if (prev.includes(char.id)) {
        return prev.filter(id => id !== char.id);
      } else {
        if (prev.length < 4) {
          setCharacterImages(prevImages => ({
            ...prevImages,
            [char.id]: {
              ...prevImages[char.id],
              hairFront: char.defaultHair?.front || null,
              hairBack: char.defaultHair?.back || null,
            }
          }));
          return [...prev, char.id];
        }
        return prev;
      }
    });
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

          if (!char) return null;

          return (
            <div key={charId} className="viewer-zone">
              <div className="viewer">
                {selected.hairBack && <img src={selected.hairBack} className="layer hairBack" alt="hairBack" />}
                <img src={char.base} className="layer base" alt="base" />
                {selected.accessory && selected.accessory.map((img, i) => {
                    const accItem = char.outfits.accessory.find(acc => acc.image === img);
                    return accItem && accItem.layer === 'back' ? <img key={`ab-${i}`} src={img} className="layer accessory-back" alt={`accessoryBack-${i}`} /> : null;
                })}
                {selected.socks && <img src={selected.socks} className="layer socks" alt="socks" />}
                {selected.bottom && <img src={selected.bottom} className="layer bottom" alt="bottom" />}
                {selected.inner && <img src={selected.inner} className="layer inner" alt="inner" />}
                {selected.top && <img src={selected.top} className="layer top" alt="top" />}
                {selected.dress && <img src={selected.dress} className="layer onepiece" alt="onepiece" />}
                {selected.set && <img src={selected.set} className="layer set" alt="set" />}
                {selected.outer && <img src={selected.outer} className="layer outer" alt="outer" />}
                {selected.shoes && <img src={selected.shoes} className="layer shoes" alt="shoes" />}
                {selected.accessory && selected.accessory.map((img, i) => {
                    const accItem = char.outfits.accessory.find(acc => acc.image === img);
                    return accItem && accItem.layer === 'front' ? <img key={`af-${i}`} src={img} className="layer accessory-front" alt={`accessory-${i}`} /> : null;
                })}
                {selected.hat && <img src={selected.hat} className="layer hat" alt="hat" />}
                {selected.hairFront && <img src={selected.hairFront} className="layer hairFront" alt="hairFront" />}
              </div>

              <div className="option-panel">
                {Object.keys(char.outfits).includes(activeCategory) &&
                  char.outfits[activeCategory]?.map(item => (
                    <div
                      key={item.label}
                      onClick={() => handleChange(charId, activeCategory, item)}
                      className={`option ${
                        activeCategory === 'accessory'
                            ? (selected.accessory && selected.accessory.includes(item.image) ? 'selected' : '')
                            : (selected[activeCategory] === (item.image || item) ? 'selected' : '')
                      }`}
                    >
                      {item.label || item}
                    </div>
                  ))}

                {Object.keys(char.outfits).includes(activeCategory) &&
                  (activeCategory === 'accessory'
                    ? (selected.accessory && selected.accessory.length > 0)
                    : (selected[activeCategory] && (activeCategory !== 'hair' || selected.hairFront || selected.hairBack))
                  ) && (
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
          {[ 'set', 'top', 'bottom', 'inner', 'outer', 'dress', 'socks', 'shoes', 'hair', 'hat', 'accessory' ].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'category-button active' : 'category-button'}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="footer-buttons">
        <button className="reset" onClick={resetAllCharacters}>RESET ALL</button>
        <button className="random" onClick={randomizeAllCharacters}>RANDOM ALL</button>
      </div>

    </div>

  );
}

export default App;