import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {APP_CONFIG_CONST} from "../../../app.globals";
import * as app_store from "../../../ng-store/app-store/signal-app-store";


@Component({
    selector: 'app-profile-image',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './profile-image.component.html',
    styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent {
  @Input() img = `url(${APP_CONFIG_CONST.assetsBaseUrl}/console/icon-avatar.png)` //app_globals.Defaults.AVATAR_USER_DEFAULT;
  @Input() size = 80;
  @Input() cid = 'site';

  appStore = inject(app_store.AppStore)

  constructor() {
    const semLogContext = "profile-image-component::ctor"
    console.log(semLogContext + " current: ", this.appStore.user().profile_picture)
  }

  avatarStyle(): { /* cursor: string, */ width: string, height: string, backgroundImage: string, backgroundPosition: string } {
    const semLogContext = "profile-image-component::avatar-style"
    // console.log('Avatar Image: ' + this.img);
    console.debug(semLogContext, this.appStore.user.profile_picture)

    if (this.appStore.user().profile_picture && this.appStore.user().profile_picture?.src_set && this.appStore.user().profile_picture?.src_set.length) {
      // console.log(semLogContext + " file: " + this.appStore.user.profilePicture!._id, this.appStore.user.profilePicture?.srcSet[0].url!)
      this.img = "url(" + this.appStore.user().profile_picture?.src_set[0].url! + ")"
    }

    console.debug(semLogContext + " setting bkg to : " + this.img)
    return { /* cursor: 'pointer', */ width: this.size + 'px', height: this.size + 'px', backgroundImage: this.img, backgroundPosition: 'center'};
  }

}
