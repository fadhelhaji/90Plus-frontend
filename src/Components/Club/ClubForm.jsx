import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Shield, Plus, ArrowLeft, Loader, Save } from "lucide-react";
import * as clubService from "../../services/clubService";

function ClubForm() {
  const navigate = useNavigate();
  const { id: clubId } = useParams();
  const isEdit = Boolean(clubId);

  const [formData, setFormData] = useState({ club_name: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      setPageLoading(true);
      try {
        const res = await clubService.show(clubId);
        const payload = res?.data ? res.data : res;
        const club = payload?.club || payload;

        setFormData({ club_name: club?.club_name || "" });
      } catch (err) {
        console.log(err);
        setError("Could not load club details");
      } finally {
        setPageLoading(false);
      }
    })();
  }, [isEdit, clubId]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.club_name.trim()) {
      setError("Please enter a club name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isEdit) {
        const updated = await clubService.update(clubId, formData);
        navigate(`/club/${updated?._id || clubId}`);
      } else {
        const created = await clubService.create(formData);
        navigate(`/club/${created?._id}`);
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-gradient-to-r from-green-600 to-emerald-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-xl">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                {isEdit ? "Edit Club" : "Create Your Club"}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                {isEdit
                  ? "Update your club name"
                  : "Start your football journey and build your dream team"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
              {isEdit ? (
                <Save className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl text-white">Club Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="club_name"
                className="block text-sm sm:text-base text-white mb-2 sm:mb-3"
              >
                Club Name <span className="text-red-400">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.club_name}
                type="text"
                name="club_name"
                id="club_name"
                placeholder="Enter your club name..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-red-300">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-lg border-2 border-white/20 text-white hover:bg-white/5 transition-all text-sm sm:text-base"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 sm:py-3.5 rounded-lg transition-all hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    {isEdit ? "Saving..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {isEdit ? (
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {isEdit ? "Save Changes" : "Create Club"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClubForm;
