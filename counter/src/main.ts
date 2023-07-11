import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

// Escrevendo no estado global utilizando o reducer:

type ActionType = {
  type: string;
};

const INITIAL_STATE = {
  count: 0
};


// fazendo o reducer ouvir nossas actions:
const reducer = (state = INITIAL_STATE, action: ActionType) => {
  if(action.type === 'INCREMENT_COUNTER'){
    return { count: state.count + 1 }
  }

  return state;
}; 

// primeiro argumento reducer:
const store = createStore(reducer, composeWithDevTools());


// criando a action (que nada mais eh que o pedido de alteracao do estado, e ela deve ser um objeto com a chave type descrevendo qual o tipo do pedido.):
const action = { type: 'INCREMENT_COUNTER' };

// criando um event listener para o botao (busca o elemento pelo querry selector e diz que ira ser retornado um elemento html de button, executando assim a tipagem, adicionando um evento de click.):
const buttonEl = document.querySelector('button') as HTMLButtonElement;
buttonEl.addEventListener('click', () => {
  // Eventualmente quando eu clicar no botao eu quero realizar esse pedido, quero disparar a action:
  store.dispatch(action);
});


// Toda vez que nosso estado é atualizado a gente vai la e busca essas infos através da subscribe que vai dizer pra nos que o estado foi atualizado e da getState que vai dizer pra nos qual info esta no estado atualmente:
store.subscribe(() => {
  const globalState = store.getState();

  // Aqui obtemos o elemento html que no caso o 'h2' e iremos tipa-lo:
  const countEl = document.querySelector('h2') as HTMLHeadingElement;
  // Consequentemente dentro do elemento inserimos nosso valor de count:
  countEl.innerHTML = globalState.count.toString();
});