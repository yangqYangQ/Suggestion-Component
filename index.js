class Suggestion {
    constructor(options) {
        this.$input = $(options.input);
        this._options = options;
        this._insertEl();
        this._bindEvents();
        this._searchData = _.debounce(this._searchData, 300);
    }

    _insertEl() {
        //wrapper 方便定位
        this.$input.wrap('<div class="suggestion-wrapper"></div>');

        this.$ul = $('<ul class="suggestion-ol"></ul>');
        this.$input.after(this.$ul);
    }

    _bindEvents() {
        this.$input.on('input', (e) => {
            const searchText = e.currentTarget.value;
            this._searchData(searchText);
        });

        this.$input.on('focus', (e) => {
            const searchText = this.$input.val();
            this._searchData(searchText);
        });

        this.$ul.on('click', 'li', (e) => {
            const $li = $(e.currentTarget);
            this.$input.val($li.text());

            this.$ul.removeClass('active');
        });
    }

    _searchData(searchText) {
        this._options.search && this._options.search(searchText, (filterStates) => {
            this.$ul.empty();
            filterStates.forEach((state) => {
                const $li = $('<li></li>');
                $li.text(state);
                this.$ul.append($li);
            });

            if (filterStates.length === 0) {
                this.$ul.append(`<li>${this._options.emptyTemplate}</li>`);
            }

            this.$ul.addClass('active');
        });
    }
}

new Suggestion({
    input: '#page > input.my-suggestion',
    search: (value, callback) => {
        setTimeout(() => {
            if (value === '') {
                callback([]);
                return;
            }

            const filteredStates = states.filter((state) => {
                return state.includes(value);
            });
            callback(filteredStates);
        }, 400);
    },
    emptyTemplate: '<b>没有结果</b>'
});

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];