import { model, models, Schema } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [5, 'Description must be atleast 5 characters long'],
    },
    category: {
        type: String,
        id: String,
        required: [true, 'Category is required'],
    },
    lectures: [
        {
            title: String,
            description: String,
            videoUrl: String,
            isCompleted: {
                type: Boolean,
                default: false
            }
        },
    ],
    imageUrl: String,
    price: {
        type: Number,
        default: 0
    },
    numberOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: [true, 'Course instructor name is required'],
    },
    syllabus: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isFree: {
        type: Boolean,
        default: false
    },
    lecturesCompleted: {
        type: Number,
        default: 0
    },
    duration: String,
    overview: String,
    resource: String,
    
    // Key Features of Course
    keyFeaturesOne: String,
    keyFeaturesTwo: String,
    keyFeaturesThree: String,
    keyFeaturesFour: String,
    keyFeaturesFive: String,
    keyFeaturesSix: String,

    //Skills Covered in Course
    skillsOne: String,
    skillsTwo: String,
    skillsThree: String,
    skillsFour: String,
    skillsFive: String,
    skillsSix: String,

    // Cards for Course
    cardOne: String,
    cardTwo: String,
    cardThree: String,
    cardFour: String
}, {
    timestamps: true
});

const courseModel = models.course || model('course', courseSchema);

export default courseModel;