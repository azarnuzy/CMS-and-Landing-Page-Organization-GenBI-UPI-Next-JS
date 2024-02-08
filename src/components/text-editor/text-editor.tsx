'use client';

import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import { Controller } from 'react-hook-form';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import { TTextEditorField } from '@/types/text-editor';

export type TTextEditorField = {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  wrapperClassName?: string;
  editorClassName?: string;
  toolbarClassName?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

const DraftEditor = (props: TTextEditorField) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <WysiwygEditor
            wrapperClassName={`wrapper-class ${props.wrapperClassName}`}
            editorClassName={`editor-class ${props.editorClassName}`}
            toolbarClassName={`toolbar-class flex ${props.toolbarClassName}`}
            editorState={field.value}
            onEditorStateChange={(newState) => {
              // console.log(newState);

              const contentState = newState.getCurrentContent();
              const rawContentState = convertToRaw(contentState);
              const htmlContent = draftToHtml(rawContentState);

              // console.log(htmlContent);

              props.setEditorState(newState);
              field.onChange(htmlContent);
            }}
            toolbar={{
              options: [
                'inline',
                'blockType',
                'fontSize',
                'list',
                'textAlign',
                'colorPicker',
                'link',
                'embedded',
                'emoji',
                'image',
                'remove',
                'history',
              ],
              inline: {
                inDropdown: true,
                options: [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'monospace',
                ],
              },
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              },
              fontSize: {
                options: [12, 16, 24, 32, 48, 64, 72, 96, 120, 144, 288, 432],
              },
              list: {
                inDropdown: true,
                options: ['unordered', 'ordered'],
              },
              textAlign: {
                inDropdown: true,
                options: ['left', 'center', 'right', 'justify'],
              },
              colorPicker: {
                inDropdown: true,
                options: ['hex', 'rgb', 'hsl', 'hsv', 'clear'],
              },
              link: {
                inDropdown: true,
                options: ['link', 'unlink'],
              },
              emoji: {
                inDropdown: true,
                options: ['emoji'],
              },
              image: {
                previewImage: false,
                alt: { present: true, mandatory: true },
              },
              history: {
                inDropdown: false,
                options: ['undo', 'redo'],
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default DraftEditor;
