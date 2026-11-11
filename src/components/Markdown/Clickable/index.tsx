import { DownloadButtonComponent, EmailButtonComponent, ExternalButtonComponent, InternalButtonComponent, ProjectButtonComponent } from "./Buttons";
import { LinkComponent, ExternalLinkComponent, InternalLinkComponent, EmailLinkComponent, DownloadLinkComponent } from "./Links";

const ComponentRegistry = {
    ['external-button']: ExternalButtonComponent,
    ['internal-button']: InternalButtonComponent,
    ['email-button']: EmailButtonComponent,
    ['download-button']: DownloadButtonComponent,
    ['project-button']: ProjectButtonComponent,
    ['link']: LinkComponent,
    ['external-link']: ExternalLinkComponent,
    ['internal-link']: InternalLinkComponent,
    ['email-link']: EmailLinkComponent,
    ['download-link']: DownloadLinkComponent,
}

export default ComponentRegistry;