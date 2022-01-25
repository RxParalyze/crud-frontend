import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import utilStyles from '../../styles/utils.module.css'

import { Link } from '../../components';
import { alertService } from '../../services';
import { postsRepo } from '../../helpers/api/'

export { AddEdit };

function AddEdit(props) {
    const post = props?.post;
    const isAddMode = !post;
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        content: Yup.string()
            .required('Content is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.post;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? create(data)
            : update(post.id, data);
    }

    function create(data) {
        return postsRepo.addPostToRepo(data)
            .then(() => {
                alertService.success('Post added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function update(id, data) {
        return postsRepo.updateRepo(id, data)
            .then(() => {
                alertService.success('Post updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Title of Post</label>
                    <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Content</label>
                    <textarea name="content" type="content" {...register('content')} className={utilStyles.formGrpCol} />
                    <div className="invalid-feedback">{errors.content?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/posts" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}