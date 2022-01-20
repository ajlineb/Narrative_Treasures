import React, { useState } from "react";

function Card(props) {
  const { item, sort } = props;

  const [isOpen, setIsOpen] = useState(false);

  function flipCard(event) {
    setIsOpen(!isOpen);
  }

  const {
    index,
    name,
    basic,
    magic,
    equipment_category: { name: categoryName },
    cost: { quantity, unit },
    weapon_range,
    damage: {
      damage_dice,
      damage_type: { name: damageName },
    },
    range: { normal, long },
    properties: { name: propertyName },
    desc,
  } = item;

  let gpCost = 0;
  if (unit === "gp") {
    gpCost = quantity;
  } else if (unit === "sp") {
    gpCost = quantity * 0.1;
  } else if (unit === "cp") {
    gpCost = quantity * 0.01;
  }

  let rarity = "";
  if (gpCost < 10) rarity = "common";
  else if (gpCost < 500) rarity = "uncommon";
  else if (gpCost < 1000) rarity = "rare";
  else rarity = "artifact";

  if (magic) {
    return (
      <div className="container">
        <div
          className={isOpen ? "element-card open" : "element-card"}
          onClick={flipCard}
        >
          <div className={`front-facing front-facing-${rarity}`}>
            <h1 className="abr">{name}</h1>
            <p className="title">{categoryName}</p>
            <span className="atomic-number"></span>
          </div>
          <div className={`back-facing ${rarity}`}>
            <p>{desc}</p>

            <p>
              <a
                className="btn"
                href="This will add to inventory"
                target="_blank"
              >
                Add to inventory
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div
          className={isOpen ? "element-card open" : "element-card"}
          onClick={flipCard}
        >
          <div className={`front-facing front-facing-${rarity}`}>
            <h1 className="abr">{name}</h1>
            <p className="title">{categoryName}</p>
            <span className="atomic-number">
              {quantity}
              {unit}
            </span>
          </div>
          <div className={`back-facing ${rarity}`}>
            <p>Range: {weapon_range}</p>
            <p>Damage: {damage_dice}</p>
            <p>Damage type: {damageName}</p>
            <p>
              <a
                className="btn"
                href="This will add to inventory"
                target="_blank"
              >
                Add to inventory
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
