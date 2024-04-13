import { ContentGroup } from '@common/interfaces/content-group.interface';

const roomsConfig: ContentGroup[] = [
    {
        name: 'tk.nog.rooms-modal.label.group1',
        items: [
            { name: 'tk.nog.rooms-modal.label.group1.room1', content: 'tk.nog.rooms-modal.label.group1.room1.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room2', content: 'tk.nog.rooms-modal.label.group1.room2.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room3', content: 'tk.nog.rooms-modal.label.group1.room3.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room4', content: 'tk.nog.rooms-modal.label.group1.room4.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room5', content: 'tk.nog.rooms-modal.label.group1.room5.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room6', content: 'tk.nog.rooms-modal.label.group1.room6.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room7', content: 'tk.nog.rooms-modal.label.group1.room7.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room8', content: 'tk.nog.rooms-modal.label.group1.room8.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room9', content: 'tk.nog.rooms-modal.label.group1.room9.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room10', content: 'tk.nog.rooms-modal.label.group1.room10.content' },
            { name: 'tk.nog.rooms-modal.label.group1.room11', content: 'tk.nog.rooms-modal.label.group1.room11.content' },
        ],
    },
    {
        name: 'tk.nog.rooms-modal.label.group2',
        items: [
            { name: 'tk.nog.rooms-modal.label.group2.room1', content: 'tk.nog.rooms-modal.label.group2.room1.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room2', content: 'tk.nog.rooms-modal.label.group2.room2.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room3', content: 'tk.nog.rooms-modal.label.group2.room3.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room4', content: 'tk.nog.rooms-modal.label.group2.room4.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room5', content: 'tk.nog.rooms-modal.label.group2.room5.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room6', content: 'tk.nog.rooms-modal.label.group2.room6.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room7', content: 'tk.nog.rooms-modal.label.group2.room7.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room8', content: 'tk.nog.rooms-modal.label.group2.room8.content' },
            { name: 'tk.nog.rooms-modal.label.group2.room9', content: 'tk.nog.rooms-modal.label.group2.room9.content' },
        ],
    },
    {
        name: 'tk.nog.rooms-modal.label.group3',
        items: [
            { name: 'tk.nog.rooms-modal.label.group3.room1', content: 'tk.nog.rooms-modal.label.group3.room1.content' },
            { name: 'tk.nog.rooms-modal.label.group3.room2', content: 'tk.nog.rooms-modal.label.group3.room2.content' },
            { name: 'tk.nog.rooms-modal.label.group3.room3', content: 'tk.nog.rooms-modal.label.group3.room3.content' },
        ],
    },
];

export const getRoomsConfig: () => ContentGroup[] = () => roomsConfig.map(config => ({ ...config }));
