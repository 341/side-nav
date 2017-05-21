import Component from 'ember-component';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {timeout, task} from 'ember-concurrency';
import layout from '../templates/components/bs-sidenav';

export default Component.extend({
    layout,
    open: false,
    alwaysOpen: 'isJumbo',
    alwaysHide: 'isMobile',
    media: service(),
    classNames: ['bs-sidenav'],
    indexScreen: [
        'isMobile',
        'isTablet',
        'isDesktop',
        'isJumbo',
    ],
    classNameBindings: [
        'open:open',
        'media.isMobile:isMobile',
        'media.isTablet:isTablet',
        'media.isDesktop:isDesktop',
        'media.isJumbo:isJumbo'
    ],
    changeWidth: task(function *() {
        this.toggleProperty('open');
        yield timeout(400);
    }).drop(),
    didInsertElement(){

    },
    didRender(){
        this.alwaysShow();
    },
    alwaysShow(){
        let _this = this;
        let _element = this.$();
        let alwaysOpen = get(this, 'alwaysOpen');
        let alwaysHide = get(this, 'alwaysHide');
        let indexScreen = get(this, 'indexScreen');

        let indexShow = indexScreen.indexOf(alwaysOpen);

        let after = indexScreen.slice(indexShow);
        after.forEach(function(item){
            //classNameBindings.pushObject("show"+item);
            _element.addClass("show"+item);
        });

        let indexHide = indexScreen.indexOf(alwaysHide);

        let before = indexScreen.slice(0,indexHide+1);
        console.log(before);
        before.forEach(function(item){
            //classNameBindings.pushObject("show"+item);
            _element.addClass("hide"+item);
        });
        // console.log(classNameBindings);
        // console.log(indexScreen);
        // console.log(index);
        // console.log(media.get(alwaysOpen));

        //let media = get(this, 'media');

    },
    actions: {
        // changeNav(){
        //     this.changeWidth();
        // },
        // closeSideNav(){
        //     this.toggleProperty('open');
        // },
        onMobileCollaps(){
            // let media = get(this, 'media');
            // if (!media.isXl){
            //     this.set('open',false);
            // }
        }
    }
})
;
