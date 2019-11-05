import * as React from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';
import { frontendLogger } from '../../metrikker/metrics-utils';
import { AppState } from '../../reducer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import './allerede-registrert.less';
interface StateProps {
    state: AppState;
}
type Props = InjectedIntlProps & StateProps;

class AlleredeRegistrert extends React.Component<Props> {
    handleClickAktivitetsplan (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.aktivitetsplan', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    handleClickVeienTilArbeid (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.veienTilArbeid', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    handleClickDialog (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.dialog', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    render() {
        const messages = this.props.intl.messages;
        const formidlingsgruppe = this.props.state.registreringStatus.data.formidlingsgruppe;
        const servicegruppe = this.props.state.registreringStatus.data.servicegruppe;
        const formidlingsgruppeOrFalse = formidlingsgruppe || false;
        const servicegruppeOrFalse = servicegruppe || false;
        const isIARBS = formidlingsgruppeOrFalse === 'IARBS'
        return (
            <div>
                <Banner />
                <div className="allerede-registrert">
                    <GraaBakgrunn />
                    {isIARBS ? null :
                        <Row className="">
                        <Column xs="12">
                            <Innholdstittel tag="h1" className="allerede-registrert__tittel">
                                {messages['allerede-registrert-tittel']}
                            </Innholdstittel>
                            <Normaltekst className="allerede-registrert__undertittel">
                                {messages['allerede-registrert-undertittel']}
                            </Normaltekst>
                        </Column>
                    </Row>}
                    {isIARBS ? <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <AlertStripeAdvarsel>
                                <Normaltekst className="blokk-s">Vi ser at du ønsker å registrere deg som arbeidssøker.</Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Hvis du prøver å registrere deg fordi du ønsker å søke dagpenger, må du ta kontakt med NAV.</strong></Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Ring 55 55 33 33</strong> med tastevalg 2.</Normaltekst>
                                <Normaltekst>Hvis du ikke har behov for å søke om dagpenger kan du se bort fra denne meldingen.</Normaltekst>
                            </AlertStripeAdvarsel>
                        </Column>
                    </Row> : null}
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-1-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-1-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickAktivitetsplan}
                                    data-formidlingsgruppe={formidlingsgruppeOrFalse}
                                    data-servicegruppe={servicegruppeOrFalse}
                                >
                                    {messages['allerede-registrert-boks-1-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-2-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-2-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickVeienTilArbeid}
                                    data-formidlingsgruppe={formidlingsgruppeOrFalse}
                                    data-servicegruppe={servicegruppeOrFalse}
                                >
                                    {messages['allerede-registrert-boks-2-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-3-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-3-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickDialog}
                                    data-formidlingsgruppe={formidlingsgruppeOrFalse}
                                    data-servicegruppe={servicegruppeOrFalse}
                                >
                                    {messages['allerede-registrert-boks-3-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    state: state,
});

export default connect(mapStateToProps)(injectIntl(AlleredeRegistrert));
