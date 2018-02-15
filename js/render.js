(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var ISLAND_COLONIZED = root.SHRI_ISLANDS.ISLAND_COLONIZED;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @param {string} [text] текст
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className, text) {
        var elem = document.createElement(type);
        elem.className = className;

        if (text) {
            elem.innerText = text;
        }

        return elem;
    }

    /**
     * Создает визуализацию карты по его схеме
     *
     * @param {number||string[][]} map карта островов
     * @param {number} count кол-во островов
     * @param {[number,number]} pos позиция исследователя
     * @returns {HTMLElement} HTML элемент
     */
    function render(map, count, pos = null) {
        var containerElem = element('div', 'map'),
            rowElem,
            type,
            row,
            cell,
            x,
            y,
            elem;

        containerElem.appendChild(element('div', 'map__res', 'Count: ' + Number(count)));

        for (y = 0; y < map.length; y++) {
            row = map[y];
            rowElem = element('div', 'map__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WATER:
                        type = 'water';
                        break;

                    case ISLAND:
                        type = 'island';
                        break;

                    case ISLAND_COLONIZED:
                        type = 'island-colonized';
                        break;

                    default:
                        type = undefined;
                }

                elem = element('div', 'map__cell' + (type ? ' map__cell_' + type : ''));

                if (pos && pos[1] === x && pos[0] === y) {
                  elem.classList.add('map__cell_current');
                }

                rowElem.appendChild(elem);
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    root.SHRI_ISLANDS.render = render;
})(this);
