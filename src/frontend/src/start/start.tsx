import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import KnappNeste from '../komponenter/knapp-neste';

type Props = RouteComponentProps<MatchProps>;

function Start({history}: Props) {
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                [
                    <Knapp
                        key="1"
                        type="standard"
                        className="knapp"
                        onClick={() => history.push('/avbryt')}
                    >
                        <Normaltekst>
                            <FormattedMessage id="knapp-avbryt"/>
                        </Normaltekst>
                    </Knapp>,
                    <KnappNeste
                        key="2"
                        className="mml"
                        onClick={(() => {
                            history.push('/skjema/1');
                        })}
                    />
                ]
            }
        >
            <PanelBlokk
                tittelId="overskrift-start"
                tittelCssNavnVariant="bla-variant"
                beskrivelseId="beskrivelse-start"
            />
        </PanelBlokkGruppe>
    );
}

export default Start;