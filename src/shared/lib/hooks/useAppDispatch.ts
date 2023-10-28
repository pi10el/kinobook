import type { AppDispatch } from '@/app_alt/store';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { allActions } from '@/app_alt';

const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(allActions, dispatch);
};

export default useAppDispatch;
