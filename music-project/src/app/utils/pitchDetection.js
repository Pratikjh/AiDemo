import * as tf from '@tensorflow/tfjs';
import callCallback from './callCallback';

class PitchDetection{
    /**
     * @param {Object} module
     * @param {AudioContext} audioContext
     * @param {MediaStream} stream
     * @param {function} callback
     */
    constructor(module, audioContext, stream, callback) {
        this.module = module;
        this.audioContext = audioContext;
        this.stream = stream;
        this.callback = callback;
    }
}