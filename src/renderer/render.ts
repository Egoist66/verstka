export type Component = (props?: any) => string

interface IApp {
    render: (component: Component) => DocumentFragment | null;
    mount: ({component, target, callback}: { component: Component, target: string, callback?: (node: HTMLElement) => void}) => void
}


class App implements IApp {

    static app: App | null = new App();

    constructor() {
        if(App.app === null){
            App.app = this
        }
        else {
            return App.app
        }
    }

    render(component: Component): DocumentFragment | null {
        const vNode = document.createDocumentFragment();
        const componentNode = new DOMParser().parseFromString(component(), 'text/html');

        if(componentNode.querySelector('#root')!) {
            vNode.append(componentNode.querySelector('#root')!);
            console.log('====================================');
            console.log(vNode);
            console.log('====================================');
            return vNode
        }
        else {
            throw new Error('App not found! - Root component must have id="app"')
        }
 
       
     

    }
    mount({component, target, callback}: { component: Component, target: string, callback?: (node: HTMLElement) => void}) {
       document.addEventListener('DOMContentLoaded', () => {
        const componentHTML = this.render(component)
        const rootElement = document.querySelector(target)
        if(rootElement) {
            rootElement.append(componentHTML?.querySelector('#root')!)
            if(callback){
                callback(rootElement as HTMLElement)
            }
        }
       })
        
    }
}

export default new App();