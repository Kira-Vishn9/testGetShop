import Axios from 'axios';

const accessKey = '1bac8e472a56c259d3a7355624a9e984';
const country_code = 'RU';
const format = 1;

export const onValidNumber = (inputValue: string) => {
    const number = inputValue.replace('7', '');

    return Axios
        .get(`https://apilayer.net/api/validate?access_key=${accessKey}&number=${number}&country_code=${country_code}&format=${format}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Произошла ошибка при выполнении запроса:', error);
        });
}
