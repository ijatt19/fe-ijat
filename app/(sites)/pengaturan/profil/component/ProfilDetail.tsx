import { User } from "@/types/api";
import UpdateForm from "./UpdateForm";
import GantiPassword from "./GantiPassword";
import Logout from "./Logout";
import HapusAkunButton from "./HapusAkunButton";
import { User as UserIcon, Mail, Phone, AtSign } from "lucide-react";

function ProfilDetail({ dataUser, token }: { dataUser: User; token: string }) {
  return (
    <div className="flex flex-col gap-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-violet-500 to-purple-600 h-20" />
        <div className="px-6 pb-6 -mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-violet-600 text-2xl font-bold">
              {dataUser.namaDepan.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 pt-2 sm:pt-0">
              <h2 className="text-xl font-bold text-slate-900">
                {dataUser.namaDepan} {dataUser.namaBelakang}
              </h2>
              <p className="text-sm text-slate-500 font-mono">@{dataUser.username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-slate-400" />
            Informasi Pribadi
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 shrink-0">
                <UserIcon className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Nama Depan</p>
                <p className="font-medium text-slate-900 overflow-hidden">{dataUser.namaDepan}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 shrink-0">
                <UserIcon className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Nama Belakang</p>
                <p className="font-medium text-slate-900 overflow-hidden">{dataUser.namaBelakang}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 shrink-0">
                <AtSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Username</p>
                <p className="font-medium text-slate-900 font-mono overflow-hidden">{dataUser.username}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            Kontak
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium text-slate-900 overflow-hidden">{dataUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 shrink-0">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">No. HP</p>
                <p className="font-medium text-slate-900 overflow-hidden">{dataUser.noHp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Tindakan</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <UpdateForm token={token} dataUser={dataUser} />
          <GantiPassword token={token} />
          <Logout token={token} />
          <HapusAkunButton token={token} userId={dataUser.id} />
        </div>
      </div>
    </div>
  );
}

export default ProfilDetail;
