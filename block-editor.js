(() => {
	"use strict";

	const { ToggleControl, TextControl } = wp.components;
	const { useSelect, useDispatch } = wp.data;
	const { Fragment } = wp.element;

	// Define base component properties for new panel
	const newPanel = {
		name: "jf-conversion-tracking-panel",
		title: "Conversion Tracking"
	};

	// Define settings component for new panel
	const newPanelSettings = {
		render: function () {
			const meta = useSelect((select) => select('core/editor').getEditedPostAttribute('meta'), []);
			const { editPost } = useDispatch('core/editor');

			const updateMeta = (key, value) => {
				console.log('Updating meta:', key, value); // Debug log
				editPost({
					meta: {
						...meta,
						[key]: value
					}
				});
			};

			return wp.element.createElement(
				Fragment,
				null,
				wp.element.createElement(ToggleControl, {
					label: "Enable Conversion Tracking",
					checked: !!meta.enable_conversion_tracking,
					onChange: (value) => updateMeta('enable_conversion_tracking', value)
				}),
				!!meta.enable_conversion_tracking && wp.element.createElement(
					Fragment,
					null,
					wp.element.createElement(TextControl, {
						label: "Conversion Tracking Label",
						value: meta.conversion_tracking_label || '',
						onChange: (value) => updateMeta('conversion_tracking_label', value)
					}),
					wp.element.createElement(TextControl, {
						label: "Conversion Tracking Value",
						value: meta.conversion_tracking_value || '',
						onChange: (value) => updateMeta('conversion_tracking_value', value)
					}),
					wp.element.createElement(TextControl, {
						label: "Google Ads Conversion ID",
						value: meta.google_ads_conversion_id || '',
						onChange: (value) => updateMeta('google_ads_conversion_id', value)
					})
				)
			);
		}
	};

	// Register the new panel
	wp.hooks.addFilter("jet.fb.register.plugin.jf-actions-panel.after", "jet-form-builder", function (plugins) {
		plugins.push({
			base: newPanel,
			settings: newPanelSettings
		});
		return plugins;
	});

})();
