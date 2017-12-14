import * as React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import Laster from './innholdslaster-laster';
import { STATUS } from '../ducks/utils';
import { reducerType } from '../reducer';

const array = (value: any) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: any[]) => (element: any) => array(status).toString().includes(element.status);
const noenHarFeil = (avhengigheter: any) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter: any) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));
const alleLastetEllerReloading = (avhengigheter: any) => (
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING))
);

interface InnholdslasterProps {
    avhengigheter: reducerType[];
    className: string;
    children: React.ReactChild;
    feilmeldingKey: string;
    storrelse: string;
    intl: InjectedIntl;
}

interface InnholdslasterState {
    timeout: boolean;
}

class Innholdslaster extends React.Component<InnholdslasterProps, InnholdslasterState> {
    timer?: number;

    constructor(props: any) {
        super(props);

        this.state = { timeout: false };
        this.timer = undefined;

        this.renderChildren = this.renderChildren.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    setTimer() {
        if (!this.timer) {
            this.timer = window.setTimeout(() => {
                this.setState({ timeout: true });
            },                             200);
        }
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;

            // Deferred, slik at setState ikke er en del av render
            setTimeout(() => this.setState({ timeout: false }), 0);
        }
    }

    renderChildren() {
        const { avhengigheter, className, children } = this.props;

        if (typeof children === 'function') {
            return <section className={className}>{children(avhengigheter)}</section>;
        }
        return <section className={className}>{children}</section>;
    }

    render() {
        const { avhengigheter, className, feilmeldingKey, intl, storrelse } = this.props;
        if (alleLastet(avhengigheter)) {
            return this.renderChildren();
        } else if (!this.state.timeout && alleLastetEllerReloading(avhengigheter)) {
            this.setTimer();
            return this.renderChildren();
        }

        if (noenHarFeil(avhengigheter)) {
            this.clearTimer();
            const feilmelding = (feilmeldingKey && intl.messages[feilmeldingKey]) || (
                    'Det skjedde en feil ved innlastningen av data'
                );

            return (
                <div className={className}>
                    <p>{feilmelding}</p>
                </div>
            );
        }

        return <Laster className={className} storrelse={storrelse} />;
    }
}

export default injectIntl(Innholdslaster);
