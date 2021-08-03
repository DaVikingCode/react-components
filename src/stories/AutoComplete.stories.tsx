import React, { FC, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Autocomplete, { AutocompleteProps } from '../components/Autocomplete';
import './AutoComplete.css';

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

const TokenContext = React.createContext<null | string>(null);
function useToken() {
    const [token, setToken] = useState<string | null>(null);

    React.useEffect(() => {
        fetch(`http://localhost/api/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: 'superadmin@test-brg.fr',
                password: 'secret',
            }),
        })
            .then(response => response.json())
            .then(data => setToken(data.auth_token));
    }, []);

    return token;
}

function useSearchFn<T, Data = Array<T>, Response = any>(
    fn: (value: string) => { input: RequestInfo; init?: RequestInit },
    keyFn?: (value: Response) => Data
) {
    const token = useToken();

    const asyncSearchFn: (value: string) => Promise<Data> = React.useCallback(async (value) => {
        if (!token || !value || value.length <= 2) {
            return [] as unknown as Data;
        }
        const { input, init } = fn(value);
        const request = await fetch(input, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...init?.headers
            },
            ...init
        });
        const data = (await request.json()) as Response;

        return keyFn
            ? keyFn(data)
            : data as unknown as Data;
    }, [token, fn]);

    return asyncSearchFn;
}

// const [firstname, _setFirstname] = useState<string>('Aym');
// const asyncSearchFn = useSearchFn<any[]>(
//     value => ({
//         input: `http://localhost/api/apigo/contact/search`,
//         init: {
//             body: JSON.stringify({
//                 name: value,
//                 firstname
//             })
//         }
//     }),
//     response => response.data.contacts
// );

// const entrepriseSearchFn = useSearchFn(
//     value => ({
//         input: `http://localhost/api/entreprises/filter_search`,
//         init: {
//             method: 'GET'
//         }
//     }),
//     response => response.data
// );


const Template: ComponentStory<typeof Autocomplete> = (args: AutocompleteProps<any, any, any, any>) => {
    return <form style={{ maxWidth: '600px' }}>
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
    getOptionLabel: (option: any) => option.nom
}

export const Creatable = Template.bind({});
Creatable.args = {
    label: "Entreprise",
    asyncSearchFn: () => fakeApiLoad(entreprises),
    renderOption: (option: any) => <> {option.nom} </>,
    getOptionLabel: (option: any) => option.nom
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
    asyncSearchFn: () => fakeApiLoad(users, 0),
    renderOption: (option: any) => <UserOption user={option} />,
    getOptionLabel: (option: any) => UserOptionLabel({ user: option })
}