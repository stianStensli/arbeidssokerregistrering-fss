import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import Alternativ from './alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForAlternativ } from './skjema-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import NavAlertStripe from 'nav-frontend-alertstriper';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function HelseAndreForhold(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (alternativId: number) => props.endreSvar(props.sporsmalId, alternativId),
        getTekstId: (alternativId: number) => getTekstIdForAlternativ(props.sporsmalId, alternativId),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    return (
        <React.Fragment>
            <Systemtittel tag="h1" className="spm-tittel">
                {props.intl.messages[`${props.sporsmalId}-tittel`]}
            </Systemtittel>
            <Normaltekst className="spm-ingress">
                {props.intl.messages[`${props.sporsmalId}-ingress`]}
            </Normaltekst>
            <Panel className="panel-skjema">
                <form className="form-skjema form-skjema--center">
                    <Alternativ className="alternativ-wrapper--small" alternativId={1} {...fellesProps}/>
                    <Alternativ className="alternativ-wrapper--small" alternativId={2} {...fellesProps}/>
                </form>
            </Panel>
            <NavAlertStripe type="info" className="spm-info">
                <Normaltekst>
                    {props.intl.messages[`${props.sporsmalId}-info`]}
                </Normaltekst>
            </NavAlertStripe>
        </React.Fragment>
    );
}