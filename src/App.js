import './App.css';
import interact from 'interactjs';
import settings from './settings.json';

interact('.item')
  .draggable({
    onmove: function(event) {
      const target = event.target;

      const dataX = target.getAttribute('data-x');
      const dataY = target.getAttribute('data-y');
      
      console.log(dataX, dataY);

      const initialX = parseFloat(dataX) || 0;
      const initialY = parseFloat(dataY) || 0;

      const deltaX = event.dx;
      const deltaY = event.dy;

      const newX = initialX + deltaX;
      const newY = initialY + deltaY;

      target
        .style
        .transform = `translate(${newX}px, ${newY}px)`;

      target.setAttribute('data-x', newX);
      target.setAttribute('data-y', newY);
    },
  });

  interact('.dropzone')
  .dropzone({
    accept: '.item',
    overlap: 0.75,
    ondropactivate: function (event) {
      const item = event.relatedTarget
      item.classList.add('dragging')
    },
    ondropdeactivate: function (event) {
      const item = event.relatedTarget
      item.classList.remove('dragging', 'cannot-drop')
    },
    ondragenter: function(event) {
      const item = event.relatedTarget

      //sprawdzanie type
      const dropzone = event.currentTarget
      const itemType = item.getAttribute('type');
      const dropzoneType = dropzone.getAttribute('type');
      //

      console.log(itemType, dropzoneType);

      if (itemType !== dropzoneType) return;

      item.classList.remove('cannot-drop')
      item.classList.add('can-drop')
    },
    ondragleave: function(event) {
      const item = event.relatedTarget
      item.classList.remove('can-drop')
      item.classList.add('cannot-drop')
    }
  })

  // const settingsParsed = JSON.parse(settings);



function App() {
  return (
    <div className="App">
      <div className='game-wrapper'>

        <h1 className="title">---</h1>

        <div className="board" />

        <div className='item' type='1' style={{ left: '100px', top: '100px' }}>I'm an item 1</div>
        <div className='item' type='2' style={{ left: '100px', top: '250px' }}>I'm an item 2</div>
        <div className='item' type='3' style={{ left: '100px', top: '400px' }}>I'm an item 3</div>

        <div className="dropzone" type='1' style={{ left: '100px', top: '600px' }}>
          <h3>Dropzone 1</h3>
        </div>

        <div className="dropzone" type='2' style={{ left: '300px', top: '600px' }}>
          <h3>Dropzone 2 </h3>
        </div>

        <div className="dropzone" type='3' style={{ left: '500px', top: '600px' }}>
          <h3>Dropzone3</h3>
        </div>
      
      </div>
    </div>
  );
}

export default App;
