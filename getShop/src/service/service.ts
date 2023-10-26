import Axios from 'axios';

const accessKey = 'num_live_0XPSdgheIZMoWIQdB6oEznWb4cqMFR5pwcyqF9ih';


export const onValidNumber = (inputValue: string) => {
    const number = inputValue.replace('7', '');

    return Axios
        .get(`https://api.numlookupapi.com/v1/validate/${number}?apikey=${accessKey}`)
        .then((response) => {
            return response.data.valid;
        })
        .catch((error) => {
            console.error('Произошла ошибка при выполнении запроса:', error);
        });
}
