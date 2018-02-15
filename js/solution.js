(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
      let matrix = [ ...map.map(item => [ ...item ]) ], // чтобы не изменять матрицу за пределами функции
      width = matrix.length,
        height = matrix[0].length,
        islands = [];

      function discoverFullIsland({ i, j }, matrix) {
        let neighbors = [
          {
            i: i - 1,
            j: j
          },
          {
            i: i + 1,
            j: j
          },
          {
            i: i,
            j: j - 1
          },
          {
            i: i,
            j: j + 1
          }
        ];
        matrix[i][j] = '!';
        for (let k = 0; k < 4; k++) {
          if (neighbors[k].i < 0 || neighbors[k].j < 0 || neighbors[k].i >= width || neighbors[k].j >= height) continue;
          if (matrix[neighbors[k].i][neighbors[k].j] === 1) {
            matrix = discoverFullIsland({
              i: neighbors[k].i,
              j: neighbors[k].j
            }, matrix);
          }
        };
        return matrix;
      }

      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          if (matrix[i][j] === 1) {
            islands.push(matrix = discoverFullIsland({ i, j }, matrix));
          }
        }
      }

      return islands.length;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
