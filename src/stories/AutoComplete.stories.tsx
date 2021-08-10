import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Autocomplete, { AutocompleteProps } from '../components/Autocomplete';
import './Autocomplete.css';

export default {
    title: 'Components/AutoComplete',
    component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;


async function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function fakeApiLoad<T>(data: T, delayMs: number = 2000) {
    await sleep(delayMs);
    return data;
}

const Template: ComponentStory<typeof Autocomplete> = (args: AutocompleteProps<any, any, any, any>) => {
    return <form style={{ maxWidth: '600px' }}>
        <label>{args.label}</label>
        <Autocomplete {...args} />
    </form>;
}

const entreprises = [
    { nom: 'Da Viking Code', id: '1' },
    { nom: 'Enedis', id: '2' },
    { nom: 'Etalab', id: '3' },
    { nom: 'Sibiluk', id: '4' },
];

export const Default = Template.bind({});
Default.args = {
    label: "Entreprise",
    asyncSearchFn: () => fakeApiLoad(entreprises),
    renderOption: (option: any) => <> {option.nom} </>,
    getOptionLabel: (option: any) => option.nom,
    inputProps: {
        name: 'entreprise',
    }
}

export const Multiple = Template.bind({});
Multiple.args = {
    label: "Entreprises",
    multiple: true,
    asyncSearchFn: () => fakeApiLoad(entreprises),
    renderOption: (option: any) => <> {option.nom} </>,
    getOptionLabel: (option: any) => option.nom
}

const users = [
    {
        identity: {
            name: 'Dupont',
            first_name: 'Jean',
        },
        contact_point: {
            email: 'jean.dupont@test.fr',
        },
        organization: {
            employer: 'Bouygues Télécom',
        },
    },
    {
        identity: {
            name: 'Dupont',
            first_name: 'Bertrand',
        },
        contact_point: {
            email: 'bertrand.dupont@test.fr',
        },
        organization: {
            employer: 'Bouygues Télécom',
        },
    }
];

const UserOption: FC<{ user: any }> = ({ user }) =>
    <div>
        <div>{user.identity.name} {user.identity.first_name}</div>
        <div>{user.contact_point.email}</div>
        <div>{user.organization.employer}</div>
    </div>

const UserOptionLabel = ({ user }: { user: any }) => user.identity.name + ' ' + user.identity.first_name

export const ComplexOption = Template.bind({});
ComplexOption.args = {
    label: "User",
    asyncSearchFn: () => fakeApiLoad(users),
    renderOption: (option: any) => <UserOption user={option} />,
    getOptionLabel: (option: any) => UserOptionLabel({ user: option })
}

export const Synchronous = Template.bind({});
Synchronous.args = {
    label: "Synchronous",
    asyncSearchFn: () => fakeApiLoad(users, 0),
    renderOption: (option: any) => <UserOption user={option} />,
    getOptionLabel: (option: any) => UserOptionLabel({ user: option })
}