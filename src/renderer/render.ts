export type Component = (props?: any) => string

interface IApp {
    render: (component: Component) => DocumentFragment | null;
    mount: ({component, target, callback}: { component: Component, target: string, callback?: (node: HTMLElement) => void}) => void
}


/**
 * Class for rendering components
 * 
 * @example
 * 
 * const app = new App();
 * app.mount({
 *  component: () => `<div id="app">Hello world</div>`,
 *  target: '#root',
 *  callback: (node) => console.log(node)
 * });
 */
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

    /**
     * Render a component as a DocumentFragment
     * 
     * @param component - The component to render
     * @returns The rendered DocumentFragment or null
     * @throws Error if the root component is not found
     */
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
    /**
     * Mounts a component to a specified target in the DOM once the content is fully loaded.
     * 
     * @param {Object} options - Options for the mount operation.
     * @param {Component} options.component - The component to render and mount.
     * @param {string} options.target - The CSS selector of the target element to mount the component to.
     * @param {Function} [options.callback] - Optional callback function to be executed with the mounted node.
     * 
     * @throws Error if the target element is not found.
     */

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