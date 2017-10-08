// @flow
/* eslint-disable import/first, no-unused-vars, import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved, import/extensions */
export default (text = 'Hello world') => {
    const element = document.createElement('div');

    //element.className = 'pure-button';
    element.className = 'fa fa-hand-spock-o fa-1g';
    element.innerHTML = text; /*'Hello world';*/

    element.onclick = () => {
        import('./lazy').then((lazy) => {
            element.textContent = lazy.default;
        }).catch((err) => {
            console.error(err);
        });
    };
    return element;
};

// Web Workers
//import Worker from 'worker-loader!./worker';
//
//export default () => {
//    const element = document.createElement('h1');
//    const worker = new Worker();
//    const state = { text: 'foo' };
//
//    worker.addEventListener(
//        'message',
//        ({ data: { text } }) => {
//            state.text = text;
//            element.innerHTML = text;
//        }
//    );
//
//    element.innerHTML = state.text;
//    element.onclick = () => worker.postMessage({ text: state.text });
//
//    return element;
//};