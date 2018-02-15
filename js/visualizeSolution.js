(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(map) {
      function Visualisator() {
        this.log = [];
        this.position = 0;
        this.solutionLogger = function(map, log) {
          let matrix = [ ...map.map(item => [ ...item ]) ], // чтобы не изменять матрицу за пределами функции
          width = matrix.length,
            height = matrix[0].length,
            islands = [];
          log.push(JSON.stringify({ count: 0, action: 'Start', map: matrix, position: [ 0, 0 ] }));
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
            log.push(JSON.stringify({ count: islands.length, action: 'Found a piece of land, going to discover.', map: matrix, position: [ i, j ] }));
            for (let k = 0; k < 4; k++) {
              if (neighbors[k].i < 0 || neighbors[k].j < 0 || neighbors[k].i >= width || neighbors[k].j >= height) continue;
              switch (k) {
                case 0: log.push(JSON.stringify({ count: islands.length, action: 'Trying to look for land north...', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                  break;
                case 1: log.push(JSON.stringify({ count: islands.length, action: 'Trying to look for land south...', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                  break;
                case 2: log.push(JSON.stringify({ count: islands.length, action: 'Trying to look for land east...', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                  break;
                case 3: log.push(JSON.stringify({ count: islands.length, action: 'Trying to look for land west...', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                  break;
              };
              if (matrix[neighbors[k].i][neighbors[k].j] === '!') {
                log.push(JSON.stringify({ count: islands.length, action: 'We`ve been here already!', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                continue;
              };
              if (matrix[neighbors[k].i][neighbors[k].j] === 1) {
                log.push(JSON.stringify({ count: islands.length, action: 'Hurray! Another land piece!', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
                matrix = discoverFullIsland({
                  i: neighbors[k].i,
                  j: neighbors[k].j
                }, matrix);
              } else {
                log.push(JSON.stringify({ count: islands.length, action: 'Oops! No land here.', map: matrix, position: [ neighbors[k].i, neighbors[k].j ] }));
              }
            };
            return matrix;
          }
          for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
              if (matrix[i][j] === 1) {
                islands.push(matrix = discoverFullIsland({ i, j }, matrix));
                log.push(JSON.stringify({ count: islands.length, action: 'Island fully explored, searching for the next one', map: matrix, position: [ i, j ] }));
              }
            }
          }
          log.push(JSON.stringify({ count: islands.length, action: 'Finished', map: matrix, position: null }));
          return islands.length;
        };

        this.changeStepDescription = function (desc) {
          this.stepDescription.innerText = desc;
        };

        this.renderVisualisation = function (data) {
          let step = JSON.parse(data),
            toRemove = this.visualisationArea.children;
          for (let i = 0, elQuantity = toRemove.length; i < elQuantity; i++) {
            this.visualisationArea.removeChild(toRemove[i]);
          };
          this.visualisationArea.appendChild(root.SHRI_ISLANDS.render(step.map, step.count, step.position));
          this.changeStepDescription(step.action);
        };
        
        this.showStep = function (no) {
          this.renderVisualisation(this.log[no]);
        };

        this.nextStep = function () {
          if (this.position === this.log.length - 1) return;
          this.showStep(++this.position);
        };

        this.previousStep = function () {
          if (this.position === 0) return;
          this.showStep(--this.position);
        };

        this.initialiseVisualisation = function () {
          this.visualisationArea = document.querySelector('.visualisation');
          this.controls = document.createElement('div');
          this.controls.classList.add('visualisation__controls');
          let buttonNext = document.createElement('button');
          buttonNext.innerText = '>';
          buttonNext.addEventListener('click', this.nextStep.bind(this));
          let buttonPrevious = document.createElement('button');
          buttonPrevious.innerText = '<';
          buttonPrevious.addEventListener('click', this.previousStep.bind(this));
          this.controls.appendChild(buttonPrevious);
          this.controls.appendChild(buttonNext);
          this.visualisationArea.parentElement.insertBefore(this.controls, this.visualisationArea);
          this.stepDescription = document.createElement('span');
          this.visualisationArea.parentElement.insertBefore(this.stepDescription, this.visualisationArea);
        };

        this.solutionLogger(map, this.log);
        this.initialiseVisualisation();
        this.showStep(this.position);
      }

      return new Visualisator(root.SHRI_ISLANDS.MAP);
    }
    
    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution(root.SHRI_ISLANDS.MAP);
})(this);
