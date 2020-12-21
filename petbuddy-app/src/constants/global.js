export const PETS = [{ value: 0, label: 'Dogs' }, { value: 1, label: 'Cats' }, { value: 2, label: 'Rabbits' },
{ value: 3, label: 'Birds', value: 4, label: 'Other' }];

export const SERVICES = [{ value: 0, label: 'House sitting' }, { value: 1, label: 'Pet boarding' },
{ value: 2, label: 'Dog walking' }, { value: 3, label: 'Pet grooming' }];

export const PREFERENCES = [{ value: 0, label: 'Lives in an apartment' }, { value: 1, label: 'Have kids' },
{ value: 2, label: 'Own a cat' }, { value: 3, label: 'Own a dog' }];

export const LEVELS = [{ value: 0, label: 'Level 1' }, { value: 1, label: 'Level 2' }, { value: 2, label: 'Level 3' },
{ value: 3, label: 'Level 4' }, { value: 4, label: 'Level 5' }];

export const DISTRICTS = [{ value: 0, label: 'Ampara' }, { value: 1, label: 'Anuradhapura' }, { value: 2, label: 'Badulla' },
{ value: 3, label: 'Batticaloa' }, { value: 4, label: 'Colombo' }, { value: 5, label: 'Galle' }, { value: 6, label: 'Gampaha' },
{ value: 7, label: 'Hambantota' }, { value: 8, label: 'Jaffna' }, { value: 9, label: 'Kalutara' }, { value: 10, label: 'Kandy' },
{ value: 11, label: 'Kegalle' }, { value: 12, label: 'Kilinochchi' }, { value: 13, label: 'Kurunegala' }, { value: 14, label: 'Mannar' },
{ value: 15, label: 'Matale' }, { value: 16, label: 'Matara' }, { value: 17, label: 'Monaragala' }, { value: 18, label: 'Mulativu' },
{ value: 19, label: 'Nuwara Eliya' }, { value: 20, label: 'Polonnaruwa' }, { value: 21, label: 'Puttalam' }, { value: 22, label: 'Ratnapura' },
{ value: 23, label: 'Trincomalee' }, { value: 24, label: 'Vavuniya' }]

export const FindLabel = (value, array) => {
    let element = array.find(level => level.value === value);
    if (element != undefined && element != null) {
        return element.label;
    }
    else {
        return null;
    }
}